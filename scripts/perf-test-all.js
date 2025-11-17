#!/usr/bin/env node

/**
 * @file scripts/perf-test-all.js
 * @brief Performance test orchestrator that runs all performance tests and aggregates results
 *
 * This script coordinates the execution of build, page, and API performance tests,
 * then aggregates the results, compares them with historical data, and generates a summary.
 */

const { spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "performance-reports");
const HISTORY_FILE = path.join(OUTPUT_DIR, "history.json");

/**
 * @brief Executes a shell command as a child process
 * @param {string} command - The command to execute
 * @param {Array<string>} args - Array of command arguments
 * @return {Promise<void>} Resolves when command succeeds, rejects on failure
 */
function runCommand(command, args = []) {
  return new Promise((resolve, reject) => {
    console.log(`\n[RUN]  Running: ${command} ${args.join(" ")}\n`);

    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
    });

    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });

    proc.on("error", (err) => {
      reject(err);
    });
  });
}

/**
 * @brief Loads performance test results from JSON files
 * @return {Object} Combined results object containing pages, api, and build data
 */
function loadResults() {
  const results = {
    timestamp: new Date().toISOString(),
    pages: null,
    api: null,
    build: null,
  };

  // Load page performance results if available
  const pagesFile = path.join(OUTPUT_DIR, "page-performance.json");
  if (fs.existsSync(pagesFile)) {
    results.pages = JSON.parse(fs.readFileSync(pagesFile, "utf-8"));
  }

  // Load API performance results if available
  const apiFile = path.join(OUTPUT_DIR, "api-performance.json");
  if (fs.existsSync(apiFile)) {
    results.api = JSON.parse(fs.readFileSync(apiFile, "utf-8"));
  }

  // Load build performance results if available
  const buildFile = path.join(OUTPUT_DIR, "build-performance.json");
  if (fs.existsSync(buildFile)) {
    results.build = JSON.parse(fs.readFileSync(buildFile, "utf-8"));
  }

  return results;
}

/**
 * @brief Calculates average metrics and summary statistics from all test results
 * @param {Object} results - Combined results object from loadResults()
 * @return {Object} Summary object with averages and totals for each test category
 */
function calculateSummary(results) {
  const summary = {
    timestamp: results.timestamp,
    pages: {
      total: 0,
      avgLoadTime: 0,
      avgTTFB: 0,
      avgFCP: 0,
      avgLCP: 0,
    },
    api: {
      total: 0,
      avgLatency: 0,
      avgP95: 0,
      avgP99: 0,
      totalRequests: 0,
    },
    build: {
      totalTimeMs: 0,
      totalTimeReadable: "",
    },
  };

  // Calculate average metrics for page performance tests
  if (results.pages && Array.isArray(results.pages)) {
    const validPages = results.pages.filter((p) => p.metrics);
    summary.pages.total = validPages.length;

    if (validPages.length > 0) {
      summary.pages.avgLoadTime = Math.round(
        validPages.reduce((sum, p) => sum + p.metrics.loadTime, 0) / validPages.length
      );
      summary.pages.avgTTFB = Math.round(
        validPages.reduce((sum, p) => sum + p.metrics.ttfb, 0) / validPages.length
      );
      summary.pages.avgFCP = Math.round(
        validPages.reduce((sum, p) => sum + p.metrics.fcp, 0) / validPages.length
      );
      summary.pages.avgLCP = Math.round(
        validPages.reduce((sum, p) => sum + p.metrics.lcp, 0) / validPages.length
      );
    }
  }

  // Calculate average metrics for API performance tests
  if (results.api && Array.isArray(results.api)) {
    const validApis = results.api.filter((a) => a.latency);
    summary.api.total = validApis.length;

    if (validApis.length > 0) {
      summary.api.avgLatency = (
        validApis.reduce((sum, a) => sum + a.latency.average, 0) / validApis.length
      ).toFixed(2);
      // Calculate P95 average, handling undefined values
      const p95Values = validApis
        .map((a) => a.latency.p95)
        .filter((p) => p !== undefined && !isNaN(p));
      summary.api.avgP95 =
        p95Values.length > 0
          ? Math.round(p95Values.reduce((sum, p) => sum + p, 0) / p95Values.length)
          : 0;
      summary.api.avgP99 = Math.round(
        validApis.reduce((sum, a) => sum + (a.latency.p99 || 0), 0) / validApis.length
      );
      summary.api.totalRequests = validApis.reduce((sum, a) => sum + a.requests.total, 0);
    }
  }

  // Extract build metrics from build test results
  if (results.build && results.build.times) {
    summary.build.totalTimeMs = results.build.times.total_ms;
    summary.build.totalTimeReadable = results.build.times_readable.total;
  }

  return summary;
}

/**
 * @brief Saves the current test results to the history file for trend analysis
 * @param {Object} results - Combined results object
 * @param {Object} summary - Summary statistics object
 */
function saveHistory(results, summary) {
  let history = [];

  // Load existing history if it exists
  if (fs.existsSync(HISTORY_FILE)) {
    try {
      history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    } catch (e) {
      console.warn("Could not load history file, starting fresh");
    }
  }

  // Append current test run to history
  history.push({
    timestamp: results.timestamp,
    summary,
  });

  // Keep only the most recent 30 test runs
  if (history.length > 30) {
    history = history.slice(-30);
  }

  // Write updated history back to file atomically
  try {
    const tempFile = `${HISTORY_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(history, null, 2));
    fs.renameSync(tempFile, HISTORY_FILE);
  } catch (e) {
    console.warn("Could not save history file:", e.message);
  }
}

/**
 * @brief Compares current results with the previous test run to show trends
 * @param {Object} summary - Current summary statistics
 * @return {Object|null} Percentage changes for each metric, or null if no history exists
 */
function compareWithPrevious(summary) {
  if (!fs.existsSync(HISTORY_FILE)) {
    return null;
  }

  try {
    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, "utf-8"));
    if (history.length < 2) {
      return null;
    }

    const previous = history[history.length - 2].summary;
    const comparison = {
      pages: {
        loadTime:
          ((summary.pages.avgLoadTime - previous.pages.avgLoadTime) / previous.pages.avgLoadTime) *
          100,
        lcp: ((summary.pages.avgLCP - previous.pages.avgLCP) / previous.pages.avgLCP) * 100,
      },
      api: {
        latency:
          ((summary.api.avgLatency - previous.api.avgLatency) / previous.api.avgLatency) * 100,
        p95: ((summary.api.avgP95 - previous.api.avgP95) / previous.api.avgP95) * 100,
      },
      build: {
        totalTime:
          ((summary.build.totalTimeMs - previous.build.totalTimeMs) / previous.build.totalTimeMs) *
          100,
      },
    };

    return comparison;
  } catch (e) {
    console.warn("Could not compare with previous results");
    return null;
  }
}

/**
 * @brief Prints a formatted summary of test results to the console
 * @param {Object} summary - Summary statistics object
 * @param {Object|null} comparison - Comparison with previous run, or null
 */
function printSummary(summary, comparison) {
  console.log("\n════════════════════════════════════════════════════════");
  console.log("      PERFORMANCE TEST SUMMARY                         ");
  console.log("════════════════════════════════════════════════════════\n");

  // Display page performance metrics
  console.log("[INFO] PAGE PERFORMANCE:");
  console.log(`   Pages Tested: ${summary.pages.total}`);
  console.log(`   Avg Load Time: ${summary.pages.avgLoadTime}ms`);
  console.log(`   Avg TTFB: ${summary.pages.avgTTFB}ms`);
  console.log(`   Avg FCP: ${summary.pages.avgFCP}ms`);
  console.log(`   Avg LCP: ${summary.pages.avgLCP}ms`);

  if (comparison && comparison.pages) {
    const loadDiff = comparison.pages.loadTime.toFixed(1);
    const lcpDiff = comparison.pages.lcp.toFixed(1);
    console.log(
      `   vs Previous: Load ${loadDiff > 0 ? "+" : ""}${loadDiff}%, LCP ${lcpDiff > 0 ? "+" : ""}${lcpDiff}%`
    );
  }

  // Display API performance metrics
  console.log("\n[API] API PERFORMANCE:");
  console.log(`   Endpoints Tested: ${summary.api.total}`);
  console.log(`   Avg Latency: ${summary.api.avgLatency}ms`);
  console.log(`   Avg P95: ${summary.api.avgP95}ms`);
  console.log(`   Avg P99: ${summary.api.avgP99}ms`);
  console.log(`   Total Requests: ${summary.api.totalRequests}`);

  if (comparison && comparison.api) {
    const latencyDiff = comparison.api.latency.toFixed(1);
    const p95Diff = comparison.api.p95.toFixed(1);
    console.log(
      `   vs Previous: Latency ${latencyDiff > 0 ? "+" : ""}${latencyDiff}%, P95 ${p95Diff > 0 ? "+" : ""}${p95Diff}%`
    );
  }

  // Display build performance metrics
  console.log("\n[BUILD]  BUILD PERFORMANCE:");
  console.log(`   Total Build Time: ${summary.build.totalTimeReadable}`);

  if (comparison && comparison.build) {
    const buildDiff = comparison.build.totalTime.toFixed(1);
    console.log(`   vs Previous: ${buildDiff > 0 ? "+" : ""}${buildDiff}%`);
  }

  console.log("\n");
}

/**
 * @brief Main function that orchestrates all performance tests
 * @return {Promise<number>} Exit code (0 for success, 1 for failure)
 */
async function runAllTests() {
  console.log("════════════════════════════════════════════════════════");
  console.log("   [START] RUNNING ALL PERFORMANCE TESTS                    ");
  console.log("════════════════════════════════════════════════════════");

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  try {
    // Run the build performance test first (doesn't require a server)
    // Skip if build results already exist (e.g., in CI where build was already done)
    const buildFile = path.join(OUTPUT_DIR, "build-performance.json");
    if (!fs.existsSync(buildFile)) {
      console.log("\n");
      console.log("  1/3: BUILD PERFORMANCE TEST");
      console.log("");
      await runCommand("./scripts/perf-test-build.sh");
    } else {
      console.log("\n");
      console.log("  [INFO] Build performance results already exist, skipping build test");
    }

    // Check if page and API tests have been run (they require a server)
    const pagesFile = path.join(OUTPUT_DIR, "page-performance.json");
    const apiFile = path.join(OUTPUT_DIR, "api-performance.json");

    if (!fs.existsSync(pagesFile)) {
      console.log("\n");
      console.log("  [WARN] Page performance test not run (requires server)");
      console.log("   Run: node scripts/perf-test-pages.js\n");
    }

    if (!fs.existsSync(apiFile)) {
      console.log("\n");
      console.log("  [WARN] API performance test not run (requires server)");
      console.log("   Run: node scripts/perf-test-api.js\n");
    }

    // Load all test results and aggregate them
    console.log("\n");
    console.log("  AGGREGATING RESULTS");
    console.log("");

    const results = loadResults();
    const summary = calculateSummary(results);

    // Update historical data
    saveHistory(results, summary);

    // Generate comparison with previous run
    const comparison = compareWithPrevious(summary);

    // Save the aggregated results to a JSON file
    const aggregatedPath = path.join(OUTPUT_DIR, "aggregated-results.json");
    fs.writeFileSync(aggregatedPath, JSON.stringify({ results, summary, comparison }, null, 2));
    console.log(`\n[INFO] Aggregated results saved to: ${aggregatedPath}`);

    // Display summary to console
    printSummary(summary, comparison);

    console.log("[PASS] All tests completed successfully!\n");
    return 0;
  } catch (error) {
    console.error("\n[FAIL] Tests failed:", error.message);
    return 1;
  }
}

// Execute the orchestrator if this script is run directly
if (require.main === module) {
  runAllTests()
    .then((exitCode) => {
      process.exit(exitCode);
    })
    .catch((error) => {
      console.error("[FAIL] Unexpected error:", error);
      process.exit(1);
    });
}

module.exports = { runAllTests };
