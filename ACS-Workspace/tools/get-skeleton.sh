#!/usr/bin/env bash
# tools/get-skeleton
# Pretty repo skeleton printer that RESPECTS .gitignore by using `git ls-files`.
# Requires: git, java, javac
set -euo pipefail

DEPTH="${1:-6}"   # usage: tools/get-skeleton [depth]
ROOT_BASENAME="$(basename "$(pwd)")"

# Ensure we're in a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "❌ Not inside a git repository. Run this from your repo root."
  exit 1
fi

# Collect all visible files per .gitignore (tracked + untracked, not ignored)
# Output is NUL-separated. We'll convert to newline for Java helper.
MAPFILE_FILELIST="$(mktemp)"
git ls-files -z --cached --others --exclude-standard > "$MAPFILE_FILELIST"

# Prepare / compile the Java helper if needed
JAVA_DIR="tools/java"
BUILD_DIR="$JAVA_DIR/.build"
PRINTER_SRC="$JAVA_DIR/SkeletonPrinter.java"
PRINTER_CLS="$BUILD_DIR/SkeletonPrinter.class"

if ! command -v javac >/dev/null 2>&1; then
  echo "❌ 'javac' not found. Please install a JDK (e.g., Temurin) to use get-skeleton."
  exit 2
fi
if ! command -v java >/dev/null 2>&1; then
  echo "❌ 'java' not found. Please install a JDK to use get-skeleton."
  exit 3
fi

mkdir -p "$BUILD_DIR"
if [[ ! -f "$PRINTER_SRC" ]]; then
  echo "❌ Missing helper: $PRINTER_SRC"
  echo "   Create the file (see SkeletonPrinter.java below) and re-run."
  exit 4
fi

# (Re)compile if missing or stale
if [[ ! -f "$PRINTER_CLS" || "$PRINTER_SRC" -nt "$PRINTER_CLS" ]]; then
  javac -d "$BUILD_DIR" "$PRINTER_SRC"
fi

# Print header and run the helper
echo "${ROOT_BASENAME}/"
tr '\0' '\n' < "$MAPFILE_FILELIST" \
  | java -cp "$BUILD_DIR" SkeletonPrinter "$DEPTH"

rm -f "$MAPFILE_FILELIST"
