#!/usr/bin/env bash
# Ultra-fast staged-only secret scan using ripgrep, with smarter filters
set -euo pipefail

# Resolve rg path
if command -v rg >/dev/null 2>&1; then
  RG="rg"
elif [ -x /opt/homebrew/bin/rg ]; then
  RG="/opt/homebrew/bin/rg"
elif [ -x /usr/local/bin/rg ]; then
  RG="/usr/local/bin/rg"
else
  echo "❌ ripgrep (rg) not found. Install with: brew install ripgrep"
  exit 2
fi

echo "Scanning STAGED changes for potential secrets..."

ENV_KEYS=("GOOGLE_CLIENT_SECRET" "NEXTAUTH_SECRET")
DSN_REGEX='(?:postgres|postgresql)://[^\s"'"'"'`]+'

# Skip noisy or binary
is_skipped() {
  case "$1" in
    tools/scan-*.sh|.husky/*|*.md|*.MD|*.png|*.jpg|*.jpeg|*.gif|*.webp|*.svg|*.ico|*.pdf|*.ttf|*.otf|*.woff|*.woff2|*.zip|*.gz|*.tgz|*.mp4|*.mov|pnpm-lock.yaml|yarn.lock|package-lock.json)
      return 0 ;;
  esac
  return 1
}

found=0

while IFS= read -r file; do
  [[ -z "$file" ]] && continue
  is_skipped "$file" && continue

  blob="$(git show ":$file" 2>/dev/null || true)" || true
  [[ -z "$blob" ]] && continue
  if printf '%s' "$blob" | LC_ALL=C grep -qU $'\000'; then
    continue
  fi

  hit=0

  # 1) ENV assignments: KEY (=|:) value
  for key in "${ENV_KEYS[@]}"; do
    assign_re="(^|[^A-Za-z0-9_])(${key})[[:space:]]*(=|:)[[:space:]]*[^[:space:]]+"
    matches="$(printf '%s\n' "$blob" | "$RG" -n -e "$assign_re" || true)"

    # Drop lines where RHS starts with ${{ secrets.* }} / ${{ vars.* }} / $FOO / ${FOO}
    unsafe="$(printf '%s\n' "$matches" \
      | sed -E 's/^[^:]*:[0-9]+://g' \
      | grep -Ev '\{\{\s*(secrets|vars)\.[A-Za-z0-9_]+\s*\}\}' \
      | grep -Ev '(=|:)[[:space:]]*\$[{]?[A-Za-z_][A-Za-z0-9_]*[}]?' || true)"

    if [[ -n "$unsafe" ]]; then
      [[ $hit -eq 0 ]] && echo "⚠️  $file"
      hit=1
      # Map back to masked output (line numbers may differ, so show simplified)
      printf '%s\n' "$matches" \
        | while IFS= read -r m; do
            payload=$(echo "$m" | sed -E 's/^[^:]*:[0-9]+://')
            echo "$payload" \
              | grep -qF "$unsafe" >/dev/null 2>&1 && \
              echo "$m" | sed -E "s/(${key})[[:space:]]*(=|:)[[:space:]]*[^[:space:]]+/\1\2 ********/g" || true
          done
    fi
  done

  # 2) DSNs anywhere (skip helper + safe refs)
  if [[ "$file" != "tools/java/GrantRole.java" ]]; then
    dsn_matches="$(printf '%s\n' "$blob" | "$RG" -n -e "$DSN_REGEX" || true)"
    dsn_matches="$(printf '%s\n' "$dsn_matches" \
      | grep -Ev '\{\{\s*(secrets|vars)\.' \
      | grep -Ev '(^|\s)(e\.g\.|example|EXAMPLE)\b' || true)"
    if [[ -n "$dsn_matches" ]]; then
      [[ $hit -eq 0 ]] && echo "⚠️  $file"
      hit=1
      printf '%s\n' "$dsn_matches" \
        | sed -E 's#(postgresql?|postgres)://[^[:space:]"\047`]+#\1://********#g'
    fi
  fi

  [[ $hit -eq 1 ]] && echo "--------------------------------------------------" && found=1
done < <(git diff --cached --name-only --diff-filter=ACMR)

if [[ $found -eq 1 ]]; then
  echo "❌ Secrets detected in staged changes. Remove them or move to env files."
  exit 1
else
  echo "✅ No secrets found in staged changes."
fi
