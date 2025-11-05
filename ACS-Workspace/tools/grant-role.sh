#!/usr/bin/env bash
# tools/get-skeleton
# Pretty repo skeleton printer that RESPECTS .gitignore by using `git ls-files`.
# Requires: git, java, javac (for the tiny helper printer)

set -euo pipefail

DEPTH="${1:-6}"   # usage: tools/get-skeleton [depth]
ROOT_BASENAME="$(basename "$(pwd)")"

# Ensure we're in a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not inside a git repository. Run this from your repo root."
  exit 1
fi

# Gather all non-ignored files (tracked + untracked, excluding .gitignore rules)
TMP_FILES="$(mktemp)"
git ls-files -z --cached --others --exclude-standard > "$TMP_FILES"

# Java helper paths
JAVA_DIR="tools/java"
BUILD_DIR="$JAVA_DIR/.build"
PRINTER_SRC="$JAVA_DIR/SkeletonPrinter.java"
PRINTER_CLS="$BUILD_DIR/SkeletonPrinter.class"

command -v javac >/dev/null 2>&1 || { echo "❌ 'javac' not found. Install a JDK."; rm -f "$TMP_FILES"; exit 2; }
command -v java  >/dev/null 2>&1 || { echo "❌ 'java' not found. Install a JDK.";  rm -f "$TMP_FILES"; exit 3; }

mkdir -p "$BUILD_DIR"

if [[ ! -f "$PRINTER_SRC" ]]; then
  echo "❌ Missing helper: $PRINTER_SRC"
  echo "   Create this file (see SkeletonPrinter.java) and re-run."
  rm -f "$TMP_FILES"
  exit 4
fi

# Compile if missing or stale
if [[ ! -f "$PRINTER_CLS" || "$PRINTER_SRC" -nt "$PRINTER_CLS" ]]; then
  javac -d "$BUILD_DIR" "$PRINTER_SRC"
fi

# Print header + tree
echo "${ROOT_BASENAME}/"
tr '\0' '\n' < "$TMP_FILES" | java -cp "$BUILD_DIR" SkeletonPrinter "$DEPTH"

rm -f "$TMP_FILES"
