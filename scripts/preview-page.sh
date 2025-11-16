#!/bin/bash

# @file scripts/preview-page.sh
# @brief Script to preview ACS website pages locally in a browser
# 
# This script starts the Next.js development server and automatically
# opens the specified page in the default browser for quick previewing.
#
# Usage: ./preview-page.sh <page-name>
# Example: ./preview-page.sh home

set -e

# ANSI color codes for better terminal output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# @brief Maps a user-friendly page name to its URL path
# @param $1 - The page name entered by the user
# @return Echoes the URL path or empty string if invalid
get_page_path() {
    case "$1" in
        home)
            echo "/home"
            ;;
        about|about-us)
            echo "/about-us"
            ;;
        calendar)
            echo "/calendar"
            ;;
        mentor-mentee|mentee|mentor)
            echo "/mentor-mentee"
            ;;
        mentor-signup)
            echo "/mentor-mentee/mentor/sign-up"
            ;;
        mentee-signup)
            echo "/mentor-mentee/mentee/sign-up"
            ;;
        tinikling)
            echo "/tinikling"
            ;;
        tinikling-signup)
            echo "/tinikling/sign-up"
            ;;
        *)
            echo ""
            ;;
    esac
}

# @brief Displays usage information and available pages
show_usage() {
    echo ""
    echo -e "${BLUE}ACS Website Page Preview Tool${NC}"
    echo ""
    echo "Usage: $0 <page-name>"
    echo ""
    echo "Available pages:"
    echo "  home              - Home page"
    echo "  about, about-us   - About Us page"
    echo "  calendar          - Events calendar"
    echo "  mentor-mentee     - Mentor/Mentee program page"
    echo "  mentor-signup     - Mentor sign-up form"
    echo "  mentee-signup     - Mentee sign-up form"
    echo "  tinikling         - Tinikling program page"
    echo "  tinikling-signup  - Tinikling sign-up form"
    echo ""
    echo "Examples:"
    echo "  $0 home"
    echo "  $0 about-us"
    echo "  $0 mentor-signup"
    echo ""
}

# @brief Opens a URL in the default browser (cross-platform)
# @param $1 - The URL to open
open_browser() {
    local url="$1"
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$url"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$url" 2>/dev/null || sensible-browser "$url" 2>/dev/null
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]] || [[ "$OSTYPE" == "win32" ]]; then
        # Windows
        start "$url"
    else
        echo -e "${YELLOW}[WARN] Could not detect OS type to open browser${NC}"
        echo "Please manually open: $url"
    fi
}

# @brief Checks if the Next.js development server is running
# @return 0 if server is running, 1 otherwise
is_server_running() {
    if command -v lsof &> /dev/null; then
        lsof -i :3000 -sTCP:LISTEN -t >/dev/null 2>&1
    elif command -v netstat &> /dev/null; then
        netstat -an | grep -q ":3000.*LISTEN"
    else
        # Can't determine, assume not running
        return 1
    fi
}

# Validate input
if [ $# -eq 0 ]; then
    echo -e "${RED}[ERROR] No page name provided${NC}"
    show_usage
    exit 1
fi

PAGE_NAME="$1"
PAGE_PATH=$(get_page_path "$PAGE_NAME")

if [ -z "$PAGE_PATH" ]; then
    echo -e "${RED}[ERROR] Unknown page: $PAGE_NAME${NC}"
    show_usage
    exit 1
fi

# Construct full URL
BASE_URL="http://localhost:3000"
FULL_URL="${BASE_URL}${PAGE_PATH}"

echo ""
echo -e "${BLUE}[INFO] Preparing to preview: ${GREEN}${PAGE_NAME}${NC}"
echo -e "${BLUE}[INFO] URL: ${GREEN}${FULL_URL}${NC}"
echo ""

# Check if server is already running
if is_server_running; then
    echo -e "${GREEN}[INFO] Development server is already running${NC}"
    echo -e "${GREEN}[INFO] Opening browser...${NC}"
    sleep 1
    open_browser "$FULL_URL"
    exit 0
fi

# Start the development server
echo -e "${YELLOW}[INFO] Starting Next.js development server...${NC}"
echo -e "${YELLOW}[INFO] This may take a moment on first run${NC}"
echo ""

# Start server in background
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
echo -e "${BLUE}[INFO] Waiting for server to start...${NC}"
MAX_WAIT=60
COUNTER=0

while ! is_server_running; do
    sleep 1
    COUNTER=$((COUNTER + 1))
    if [ $COUNTER -ge $MAX_WAIT ]; then
        echo -e "${RED}[ERROR] Server failed to start within ${MAX_WAIT} seconds${NC}"
        kill $SERVER_PID 2>/dev/null || true
        exit 1
    fi
done

# Give it an extra second to fully initialize
sleep 2

echo -e "${GREEN}[SUCCESS] Server is ready${NC}"
echo -e "${GREEN}[INFO] Opening ${PAGE_NAME} in browser...${NC}"
echo ""

open_browser "$FULL_URL"

echo -e "${GREEN}[SUCCESS] Browser opened to: ${FULL_URL}${NC}"
echo ""
echo -e "${YELLOW}[INFO] The development server is running in the background${NC}"
echo -e "${YELLOW}[INFO] Press Ctrl+C to stop the server${NC}"
echo ""

# Wait for user to stop the server
wait $SERVER_PID
