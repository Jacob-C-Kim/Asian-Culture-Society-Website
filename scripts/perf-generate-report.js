#!/usr/bin/env node

/**
 * @file scripts/perf-generate-report.js
 * @brief Performance report generator that creates HTML reports with charts and comparisons
 *
 * This script loads aggregated performance test results and generates a comprehensive
 * HTML report with formatted metrics, comparisons to previous runs, and threshold checks.
 */

const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "performance-reports");
const AGGREGATED_FILE = path.join(OUTPUT_DIR, "aggregated-results.json");
const HISTORY_FILE = path.join(OUTPUT_DIR, "history.json");
const THRESHOLDS_FILE = path.join(process.cwd(), "config", "performance-thresholds.json");

/**
 * @brief Loads performance thresholds from the configuration file
 * @return {Object|null} Threshold configuration object, or null if file doesn't exist
 */
function loadThresholds() {
  if (!fs.existsSync(THRESHOLDS_FILE)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(THRESHOLDS_FILE, "utf-8"));
}

/**
 * @brief Checks if a metric value passes or fails against a threshold
 * @param {number} value - The metric value to check
 * @param {number} threshold - The threshold to compare against
 * @param {boolean} lower - If true, passing means value <= threshold; otherwise value >= threshold
 * @return {string} Returns "pass", "fail", or "unknown"
 */
function checkThreshold(value, threshold, lower = true) {
  if (!threshold) return "unknown";
  return lower ? (value <= threshold ? "pass" : "fail") : value >= threshold ? "pass" : "fail";
}

/**
 * @brief Generates a complete HTML report from performance test data
 * @param {Object} data - Combined test data including results, summary, and comparison
 * @param {Object|null} thresholds - Performance thresholds for pass/fail determination
 * @return {string} Complete HTML document as a string
 */
function generateHTML(data, thresholds) {
  const { results, summary, comparison } = data;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Performance Test Report - ${new Date(summary.timestamp).toLocaleString()}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 40px;
    }

    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 2.5em;
    }

    .timestamp {
      color: #7f8c8d;
      margin-bottom: 30px;
      font-size: 0.9em;
    }

    .section {
      margin-bottom: 40px;
    }

    .section-title {
      font-size: 1.8em;
      color: #34495e;
      margin-bottom: 20px;
      border-bottom: 3px solid #3498db;
      padding-bottom: 10px;
    }

    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 20px;
    }

    .metric-card {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      border-left: 4px solid #3498db;
    }

    .metric-card.warning {
      border-left-color: #f39c12;
    }

    .metric-card.danger {
      border-left-color: #e74c3c;
    }

    .metric-label {
      font-size: 0.9em;
      color: #7f8c8d;
      margin-bottom: 5px;
    }

    .metric-value {
      font-size: 2em;
      font-weight: bold;
      color: #2c3e50;
    }

    .metric-comparison {
      font-size: 0.85em;
      margin-top: 5px;
    }

    .metric-comparison.positive {
      color: #27ae60;
    }

    .metric-comparison.negative {
      color: #e74c3c;
    }

    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.75em;
      font-weight: bold;
      text-transform: uppercase;
      margin-top: 8px;
    }

    .status-badge.pass {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.fail {
      background: #f8d7da;
      color: #721c24;
    }

    .status-badge.unknown {
      background: #d1ecf1;
      color: #0c5460;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }

    th {
      background: #34495e;
      color: white;
      padding: 12px;
      text-align: left;
      font-weight: 600;
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #ecf0f1;
    }

    tr:hover {
      background: #f8f9fa;
    }

    .chart-container {
      margin-top: 30px;
      padding: 20px;
      background: #f8f9fa;
      border-radius: 6px;
    }

    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #ecf0f1;
      text-align: center;
      color: #7f8c8d;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>[START] Performance Test Report</h1>
    <div class="timestamp">Generated: ${new Date(summary.timestamp).toLocaleString()}</div>

    <!-- Summary Cards -->
    <div class="section">
      <h2 class="section-title">[INFO] Summary</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Pages Tested</div>
          <div class="metric-value">${summary.pages.total}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">API Endpoints Tested</div>
          <div class="metric-value">${summary.api.total}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Total Build Time</div>
          <div class="metric-value">${summary.build.totalTimeReadable}</div>
          ${comparison && comparison.build ? `<div class="metric-comparison ${comparison.build.totalTime < 0 ? "positive" : "negative"}">${comparison.build.totalTime > 0 ? "+" : ""}${comparison.build.totalTime.toFixed(1)}% vs previous</div>` : ""}
        </div>
      </div>
    </div>

    <!-- Page Performance -->
    <div class="section">
      <h2 class="section-title">[INFO] Page Performance</h2>
      <div class="metrics-grid">
        <div class="metric-card ${thresholds && summary.pages.avgLCP > thresholds.pages.LCP ? "danger" : ""}">
          <div class="metric-label">Avg Load Time</div>
          <div class="metric-value">${summary.pages.avgLoadTime}ms</div>
          ${comparison && comparison.pages ? `<div class="metric-comparison ${comparison.pages.loadTime < 0 ? "positive" : "negative"}">${comparison.pages.loadTime > 0 ? "+" : ""}${comparison.pages.loadTime.toFixed(1)}%</div>` : ""}
        </div>
        <div class="metric-card ${thresholds && summary.pages.avgFCP > thresholds.pages.FCP ? "warning" : ""}">
          <div class="metric-label">Avg FCP</div>
          <div class="metric-value">${summary.pages.avgFCP}ms</div>
          ${thresholds ? `<span class="status-badge ${checkThreshold(summary.pages.avgFCP, thresholds.pages.FCP)}">${checkThreshold(summary.pages.avgFCP, thresholds.pages.FCP)}</span>` : ""}
        </div>
        <div class="metric-card ${thresholds && summary.pages.avgLCP > thresholds.pages.LCP ? "danger" : ""}">
          <div class="metric-label">Avg LCP</div>
          <div class="metric-value">${summary.pages.avgLCP}ms</div>
          ${thresholds ? `<span class="status-badge ${checkThreshold(summary.pages.avgLCP, thresholds.pages.LCP)}">${checkThreshold(summary.pages.avgLCP, thresholds.pages.LCP)}</span>` : ""}
          ${comparison && comparison.pages ? `<div class="metric-comparison ${comparison.pages.lcp < 0 ? "positive" : "negative"}">${comparison.pages.lcp > 0 ? "+" : ""}${comparison.pages.lcp.toFixed(1)}%</div>` : ""}
        </div>
        <div class="metric-card">
          <div class="metric-label">Avg TTFB</div>
          <div class="metric-value">${summary.pages.avgTTFB}ms</div>
        </div>
      </div>

      ${
        results.pages
          ? `
      <table>
        <thead>
          <tr>
            <th>Page</th>
            <th>Load Time</th>
            <th>TTFB</th>
            <th>FCP</th>
            <th>LCP</th>
            <th>CLS</th>
          </tr>
        </thead>
        <tbody>
          ${results.pages
            .filter((p) => p.metrics)
            .map(
              (page) => `
            <tr>
              <td><strong>${page.route}</strong><br/><small style="color: #7f8c8d;">${page.path}</small></td>
              <td>${page.metrics.loadTime}ms</td>
              <td>${page.metrics.ttfb}ms</td>
              <td>${page.metrics.fcp}ms</td>
              <td>${page.metrics.lcp}ms</td>
              <td>${page.metrics.cls}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      `
          : "<p>No page performance data available</p>"
      }
    </div>

    <!-- API Performance -->
    <div class="section">
      <h2 class="section-title">[API] API Performance</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">Avg Latency</div>
          <div class="metric-value">${summary.api.avgLatency}ms</div>
          ${comparison && comparison.api ? `<div class="metric-comparison ${comparison.api.latency < 0 ? "positive" : "negative"}">${comparison.api.latency > 0 ? "+" : ""}${comparison.api.latency.toFixed(1)}%</div>` : ""}
        </div>
        <div class="metric-card ${thresholds && summary.api.avgP95 > thresholds.api.p95_latency_ms ? "warning" : ""}">
          <div class="metric-label">P95 Latency</div>
          <div class="metric-value">${summary.api.avgP95}ms</div>
          ${thresholds ? `<span class="status-badge ${checkThreshold(summary.api.avgP95, thresholds.api.p95_latency_ms)}">${checkThreshold(summary.api.avgP95, thresholds.api.p95_latency_ms)}</span>` : ""}
        </div>
        <div class="metric-card ${thresholds && summary.api.avgP99 > thresholds.api.p99_latency_ms ? "danger" : ""}">
          <div class="metric-label">P99 Latency</div>
          <div class="metric-value">${summary.api.avgP99}ms</div>
          ${thresholds ? `<span class="status-badge ${checkThreshold(summary.api.avgP99, thresholds.api.p99_latency_ms)}">${checkThreshold(summary.api.avgP99, thresholds.api.p99_latency_ms)}</span>` : ""}
        </div>
        <div class="metric-card">
          <div class="metric-label">Total Requests</div>
          <div class="metric-value">${summary.api.totalRequests.toLocaleString()}</div>
        </div>
      </div>

      ${
        results.api
          ? `
      <table>
        <thead>
          <tr>
            <th>Endpoint</th>
            <th>Avg Latency</th>
            <th>P50</th>
            <th>P95</th>
            <th>P99</th>
            <th>Req/sec</th>
          </tr>
        </thead>
        <tbody>
          ${results.api
            .filter((a) => a.latency)
            .map(
              (api) => `
            <tr>
              <td><strong>${api.endpoint}</strong><br/><small style="color: #7f8c8d;">${api.method} ${api.path}</small></td>
              <td>${api.latency.average.toFixed(2)}ms</td>
              <td>${api.latency.p50}ms</td>
              <td>${api.latency.p95}ms</td>
              <td>${api.latency.p99}ms</td>
              <td>${api.requests.mean.toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      `
          : "<p>No API performance data available</p>"
      }
    </div>

    <!-- Build Performance -->
    ${
      results.build
        ? `
    <div class="section">
      <h2 class="section-title">[BUILD] Build Performance</h2>
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-label">TypeScript Check</div>
          <div class="metric-value">${results.build.times_readable.typecheck}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Next.js Build</div>
          <div class="metric-value">${results.build.times_readable.build}</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Total Time</div>
          <div class="metric-value">${results.build.times_readable.total}</div>
          ${thresholds ? `<span class="status-badge ${checkThreshold(results.build.times.total_ms / 1000, thresholds.build.max_time_seconds)}">${checkThreshold(results.build.times.total_ms / 1000, thresholds.build.max_time_seconds)}</span>` : ""}
        </div>
        <div class="metric-card">
          <div class="metric-label">Output Size</div>
          <div class="metric-value">${results.build.bundle.next_dir_size}</div>
        </div>
      </div>
    </div>
    `
        : ""
    }

    <div class="footer">
      <p>Generated by ACS Performance Testing Suite</p>
      <p><small>Thresholds: ${thresholds ? "Loaded from config/performance-thresholds.json" : "No thresholds configured"}</small></p>
    </div>
  </div>
</body>
</html>`;

  return html;
}

/**
 * @brief Main function that generates the performance report
 * @return {number} Exit code (0 for success, 1 for failure)
 */
function generateReport() {
  console.log("[INFO] Generating Performance Report...\n");

  // Verify that aggregated results exist before proceeding
  if (!fs.existsSync(AGGREGATED_FILE)) {
    console.error("[FAIL] No aggregated results found. Run performance tests first.");
    console.error("   Command: npm run perf:all");
    return 1;
  }

  // Load the test results and threshold configuration
  const data = JSON.parse(fs.readFileSync(AGGREGATED_FILE, "utf-8"));
  const thresholds = loadThresholds();

  if (!thresholds) {
    console.warn("[WARN]  No performance thresholds configured");
  }

  // Generate the HTML report
  const html = generateHTML(data, thresholds);

  // Save the report as the latest version
  const reportPath = path.join(OUTPUT_DIR, "latest.html");
  fs.writeFileSync(reportPath, html);

  // Also save a timestamped version for historical reference
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const timestampedPath = path.join(OUTPUT_DIR, `report-${timestamp}.html`);
  fs.writeFileSync(timestampedPath, html);

  console.log(`[PASS] Report generated successfully!\n`);
  console.log(`   Latest: ${reportPath}`);
  console.log(`   Archived: ${timestampedPath}\n`);

  return 0;
}

// Run if called directly
if (require.main === module) {
  const exitCode = generateReport();
  process.exit(exitCode);
}

module.exports = { generateReport };
