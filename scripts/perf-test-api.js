#!/usr/bin/env node

/**
 * @file scripts/perf-test-api.js
 * @brief API performance testing script that measures endpoint response times and throughput
 *
 * This script uses autocannon to load test all API endpoints and collect detailed
 * performance metrics including latency percentiles, requests per second, and error rates.
 */

const autocannon = require("autocannon");
const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const OUTPUT_DIR = path.join(process.cwd(), "performance-reports");

/**
 * List of API endpoints to test with their configurations
 */
const API_ENDPOINTS = [
  {
    name: "Health Check",
    method: "GET",
    path: "/api/health",
  },
  {
    name: "Mentee Submit",
    method: "POST",
    path: "/api/submit/mentee",
    body: JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      year: "Freshman",
      major: "Computer Science",
      interests: "Programming",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    name: "Mentor Submit",
    method: "POST",
    path: "/api/submit/mentor",
    body: JSON.stringify({
      name: "Test Mentor",
      email: "mentor@example.com",
      year: "Senior",
      major: "Computer Science",
      experience: "Teaching",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  },
  {
    name: "Tinikling Submit",
    method: "POST",
    path: "/api/submit/tinikling",
    body: JSON.stringify({
      name: "Test Participant",
      email: "tinikling@example.com",
      experience: "Beginner",
    }),
    headers: {
      "Content-Type": "application/json",
    },
  },
];

/**
 * @brief Load tests a single API endpoint using autocannon
 * @param {Object} endpoint - Endpoint configuration object
 * @return {Promise<Object>} Performance metrics including latency, throughput, and error counts
 */
async function testEndpoint(endpoint) {
  console.log(`  Testing ${endpoint.name} (${endpoint.method} ${endpoint.path})...`);

  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${endpoint.path}`;

    const config = {
      url,
      method: endpoint.method,
      connections: 10, // Number of concurrent connections
      pipelining: 1,
      duration: 10, // Test duration in seconds
    };

    if (endpoint.body) {
      config.body = endpoint.body;
    }

    if (endpoint.headers) {
      config.headers = endpoint.headers;
    }

    autocannon(config, (err, result) => {
      if (err) {
        reject(err);
        return;
      }

      // Extract and format the key performance metrics
      const metrics = {
        endpoint: endpoint.name,
        method: endpoint.method,
        path: endpoint.path,
        url,
        timestamp: new Date().toISOString(),
        duration: result.duration,
        requests: {
          total: result.requests.total,
          average: result.requests.average,
          mean: result.requests.mean,
          stddev: result.requests.stddev,
          min: result.requests.min,
          max: result.requests.max,
          p50: result.requests.p50,
          p75: result.requests.p75,
          p90: result.requests.p90,
          p99: result.requests.p99,
          p999: result.requests.p999,
        },
        latency: {
          average: result.latency.mean,
          mean: result.latency.mean,
          stddev: result.latency.stddev,
          min: result.latency.min,
          max: result.latency.max,
          p50: result.latency.p50,
          p75: result.latency.p75,
          p90: result.latency.p90,
          p95: result.latency.p95,
          p99: result.latency.p99,
          p999: result.latency.p999,
        },
        throughput: {
          average: result.throughput.mean,
          mean: result.throughput.mean,
          stddev: result.throughput.stddev,
          min: result.throughput.min,
          max: result.throughput.max,
        },
        errors: result.errors,
        timeouts: result.timeouts,
        non2xx: result.non2xx || 0,
        statusCodeStats:
          result["1xx"] || result["2xx"] || result["3xx"] || result["4xx"] || result["5xx"],
      };

      console.log(
        `    [PASS] Avg Latency: ${metrics.latency.average}ms, RPS: ${metrics.requests.mean.toFixed(2)}`
      );
      resolve(metrics);
    });
  });
}

/**
 * @brief Main function that runs performance tests on all API endpoints
 * @return {Promise<Array>} Array of performance results for each endpoint
 */
async function runApiTests() {
  console.log("[START] Running API performance tests");
  console.log(`Base URL: ${BASE_URL}\n`);

  const results = [];

  for (const endpoint of API_ENDPOINTS) {
    try {
      const result = await testEndpoint(endpoint);
      results.push(result);
    } catch (error) {
      console.error(`    [FAIL] ${error.message}`);
      results.push({
        endpoint: endpoint.name,
        method: endpoint.method,
        path: endpoint.path,
        error: error.message,
      });
    }
  }

  // Create output directory if it doesn't exist
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Write results to JSON file
  const outputPath = path.join(OUTPUT_DIR, "api-performance.json");
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n[INFO] Results saved to: ${outputPath}\n`);

  // Print summary to console
  console.log("=== API Performance Summary ===\n");
  results.forEach((result) => {
    if (result.error) {
      console.log(`${result.endpoint}: ERROR - ${result.error}`);
    } else {
      console.log(`${result.endpoint}:`);
      console.log(
        `  Requests: ${result.requests.total} total, ${result.requests.mean.toFixed(2)} req/sec`
      );
      console.log(`  Latency (ms):`);
      console.log(`    Average: ${result.latency.average.toFixed(2)}`);
      console.log(`    P50: ${result.latency.p50}`);
      console.log(`    P95: ${result.latency.p95}`);
      console.log(`    P99: ${result.latency.p99}`);
      console.log(`  Errors: ${result.errors}`);
      console.log(`  Timeouts: ${result.timeouts}\n`);
    }
  });

  return results;
}

// Execute the tests if this script is run directly
if (require.main === module) {
  runApiTests()
    .then(() => {
      console.log("[SUCCESS] API performance tests completed");
      process.exit(0);
    })
    .catch((error) => {
      console.error("[ERROR] API performance tests failed:", error);
      process.exit(1);
    });
}

module.exports = { runApiTests };
