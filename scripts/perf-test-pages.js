#!/usr/bin/env node

/**
 * @file scripts/perf-test-pages.js
 * @brief Performance testing script that measures page load times and Core Web Vitals
 *
 * This script uses Playwright to visit each route in the application and collect
 * detailed performance metrics including TTFB, FCP, LCP, TBT, CLS, and resource loading stats.
 */

const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

/**
 * List of all routes in the application to be tested
 */
const ROUTES = [
  { name: "Home", path: "/home" },
  { name: "About Us", path: "/about-us" },
  { name: "Calendar", path: "/calendar" },
  { name: "Mentor/Mentee", path: "/mentor-mentee" },
  { name: "Mentor Signup", path: "/mentor-mentee/mentor/sign-up" },
  { name: "Mentee Signup", path: "/mentor-mentee/mentee/sign-up" },
  { name: "Tinikling", path: "/tinikling" },
  { name: "Tinikling Signup", path: "/tinikling/sign-up" },
];

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "performance-reports");

/**
 * @brief Measures performance metrics for a single page
 * @param {Object} page - Playwright page instance
 * @param {Object} route - Route object containing name and path
 * @return {Promise<Object>} Performance metrics including load time, TTFB, FCP, LCP, TBT, CLS
 */
async function measurePagePerformance(page, route) {
  console.log(`  Testing ${route.name} (${route.path})...`);

  const url = `${BASE_URL}${route.path}`;
  const startTime = Date.now();

  // Navigate to the page and wait for network to be idle
  await page.goto(url, { waitUntil: "networkidle" });

  const loadTime = Date.now() - startTime;

  // Collect Web Vitals and performance metrics from the browser
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      const perfData = {
        ttfb: 0,
        fcp: 0,
        lcp: 0,
        cls: 0,
        tbt: 0,
        transferSize: 0,
        resourceCount: 0,
      };

      // Extract Time to First Byte from Navigation Timing API
      const perfEntries = performance.getEntriesByType("navigation")[0];
      if (perfEntries) {
        perfData.ttfb = perfEntries.responseStart - perfEntries.requestStart;
      }

      // Get First Contentful Paint from Paint Timing API
      const paintEntries = performance.getEntriesByType("paint");
      const fcp = paintEntries.find((e) => e.name === "first-contentful-paint");
      if (fcp) {
        perfData.fcp = fcp.startTime;
      }

      // Count resources loaded and calculate total transfer size
      const resources = performance.getEntriesByType("resource");
      perfData.resourceCount = resources.length;
      perfData.transferSize = resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

      // Use PerformanceObserver to capture LCP and CLS values
      let lcpValue = 0;
      let clsValue = 0;

      try {
        // Capture Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          lcpValue = lastEntry.renderTime || lastEntry.loadTime;
        });
        lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
      } catch (e) {
        // LCP API not available in this browser
      }

      try {
        // Calculate Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
        });
        clsObserver.observe({ type: "layout-shift", buffered: true });
      } catch (e) {
        // CLS API not available in this browser
      }

      // Give observers time to collect data before resolving
      setTimeout(() => {
        perfData.lcp = lcpValue;
        perfData.cls = clsValue;
        resolve(perfData);
      }, 100);
    });
  });

  // Approximate Total Blocking Time by measuring long tasks
  const longTasks = await page.evaluate(() => {
    try {
      const entries = performance.getEntriesByType("longtask");
      return entries.reduce((sum, task) => sum + Math.max(0, task.duration - 50), 0);
    } catch (e) {
      return 0;
    }
  });

  return {
    route: route.name,
    path: route.path,
    url,
    timestamp: new Date().toISOString(),
    metrics: {
      loadTime,
      ttfb: Math.round(metrics.ttfb),
      fcp: Math.round(metrics.fcp),
      lcp: Math.round(metrics.lcp),
      tbt: Math.round(longTasks),
      cls: parseFloat(metrics.cls.toFixed(3)),
      transferSize: Math.round(metrics.transferSize / 1024), // Convert to KB
      resourceCount: metrics.resourceCount,
    },
  };
}

/**
 * @brief Main function that runs performance tests on all routes
 * @return {Promise<Array>} Array of performance results for each route
 */
async function runPageTests() {
  console.log("[START] Running page performance tests");
  console.log(`Base URL: ${BASE_URL}\n`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });

  const page = await context.newPage();

  const results = [];

  for (const route of ROUTES) {
    try {
      const result = await measurePagePerformance(page, route);
      results.push(result);
      console.log(`    [PASS] Completed`);
    } catch (error) {
      console.error(`    [FAIL] ${error.message}`);
      results.push({
        route: route.name,
        path: route.path,
        error: error.message,
      });
    }
  }

  await browser.close();

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write results to JSON file
  const outputPath = path.join(OUTPUT_DIR, "page-performance.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n[INFO] Results saved to: ${outputPath}\n`);

  // Print summary to console
  console.log("=== Performance Summary ===\n");
  results.forEach((result) => {
    if (result.error) {
      console.log(`${result.route}: ERROR - ${result.error}`);
    } else {
      const m = result.metrics;
      console.log(`${result.route}:`);
      console.log(`  Load Time: ${m.loadTime}ms`);
      console.log(`  TTFB: ${m.ttfb}ms`);
      console.log(`  FCP: ${m.fcp}ms`);
      console.log(`  LCP: ${m.lcp}ms`);
      console.log(`  TBT: ${m.tbt}ms`);
      console.log(`  CLS: ${m.cls}`);
      console.log(`  Transfer: ${m.transferSize}KB`);
      console.log(`  Resources: ${m.resourceCount}\n`);
    }
  });

  return results;
}

// Execute the tests if this script is run directly
if (require.main === module) {
  runPageTests()
    .then(() => {
      console.log("[SUCCESS] Page performance tests completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[ERROR] Page performance tests failed:", error);
      process.exit(1);
    });
}

module.exports = { runPageTests };
