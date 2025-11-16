#!/bin/bash

# @file scripts/perf-test-build.sh
# @brief Measures build performance including TypeScript compilation and Next.js build time
#
# This script cleans the previous build, measures the time taken for type checking
# and building the Next.js application, then analyzes bundle sizes.

set -e

OUTPUT_DIR="performance-reports"
OUTPUT_FILE="$OUTPUT_DIR/build-performance.json"

mkdir -p "$OUTPUT_DIR"

echo "[START] Running build performance tests"
echo ""

# Clean previous build artifacts
echo "Cleaning previous build..."
rm -rf .next 2>/dev/null || true
rm -rf node_modules/.cache 2>/dev/null || true

# Measure npm install time (if node_modules doesn't exist)
if [ ! -d "node_modules" ]; then
  echo "[INFO] Measuring npm install time..."
  INSTALL_START=$(node -e "console.log(Date.now())")
  npm ci --silent
  INSTALL_END=$(node -e "console.log(Date.now())")
  INSTALL_TIME=$((INSTALL_END - INSTALL_START))
  echo "  [PASS] Install completed in ${INSTALL_TIME}ms"
else
  INSTALL_TIME=0
  echo "  [SKIP] node_modules already exists"
fi

# Measure TypeScript type check time
echo "[INFO] Measuring TypeScript compilation time..."
TYPECHECK_START=$(node -e "console.log(Date.now())")
npm run type-check --silent
TYPECHECK_END=$(node -e "console.log(Date.now())")
TYPECHECK_TIME=$((TYPECHECK_END - TYPECHECK_START))
echo "  [PASS] Type check completed in ${TYPECHECK_TIME}ms"

# Measure Next.js build time
echo "[INFO] Measuring Next.js build time..."
BUILD_START=$(node -e "console.log(Date.now())")
npm run build > build-output.tmp 2>&1
BUILD_END=$(node -e "console.log(Date.now())")
BUILD_TIME=$((BUILD_END - BUILD_START))
echo "  [PASS] Build completed in ${BUILD_TIME}ms"

# Calculate total time
TOTAL_TIME=$((INSTALL_TIME + TYPECHECK_TIME + BUILD_TIME))

# Extract bundle sizes from build output
echo "[INFO] Analyzing bundle sizes..."

# Parse Next.js build output for route sizes
ROUTE_SIZES=$(grep -E "^├|^└" build-output.tmp | head -20 || echo "")

# Get .next directory size
NEXT_SIZE=$(du -sh .next 2>/dev/null | awk '{print $1}' || echo "0")

# Clean up temp file
rm -f build-output.tmp

# Create JSON output with all the collected metrics
INSTALL_SEC=$(node -e "console.log(($INSTALL_TIME/1000).toFixed(2))")
TYPECHECK_SEC=$(node -e "console.log(($TYPECHECK_TIME/1000).toFixed(2))")
BUILD_SEC=$(node -e "console.log(($BUILD_TIME/1000).toFixed(2))")
TOTAL_SEC=$(node -e "console.log(($TOTAL_TIME/1000).toFixed(2))")
TIMESTAMP=$(node -e "console.log(new Date().toISOString())")

cat > "$OUTPUT_FILE" << EOF
{
  "timestamp": "$TIMESTAMP",
  "times": {
    "install_ms": $INSTALL_TIME,
    "typecheck_ms": $TYPECHECK_TIME,
    "build_ms": $BUILD_TIME,
    "total_ms": $TOTAL_TIME
  },
  "times_readable": {
    "install": "${INSTALL_SEC}s",
    "typecheck": "${TYPECHECK_SEC}s",
    "build": "${BUILD_SEC}s",
    "total": "${TOTAL_SEC}s"
  },
  "bundle": {
    "next_dir_size": "$NEXT_SIZE"
  }
}
EOF

echo ""
echo "[INFO] Results saved to: $OUTPUT_FILE"
echo ""
echo "=== Build Performance Summary ==="
echo ""
echo "Install Time:    ${INSTALL_SEC}s"
echo "TypeCheck Time:  ${TYPECHECK_SEC}s"
echo "Build Time:      ${BUILD_SEC}s"
echo "Total Time:      ${TOTAL_SEC}s"
echo ""
echo ".next Directory: $NEXT_SIZE"
echo ""
echo "[SUCCESS] Build performance tests completed"

