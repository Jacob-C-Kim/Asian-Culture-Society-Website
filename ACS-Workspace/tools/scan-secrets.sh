#!/usr/bin/env bash
# scan-secrets.sh — full-repo scan with smarter filters (drop GitHub secrets/vars & shell var indirection)
set -euo pipefail

echo "🔍 Scanning repository for potential secrets..."

ENV_KEYS=("GOOGLE_CLIENT_SECRET" "NEXTAUTH_SECRET")
DSN_REGEX='postgresql://[^[:space:]"]+'
found=false

# 1) Env key assignments: KEY (=|:) value
for key in "${ENV_KEYS[@]}"; do
  echo "Checking for assignments to: $key"
  rgx="(^|[^A-Za-z0-9_])(${key})[[:space:]]*(=|:)[[:space:]]*[^[:space:]]+"

  matches=$(git grep -In -E "$rgx" -- ':!tools/scan-*.sh' ':!*.md' ':!*.MD' || true)
  if [[ -n "$matches" ]]; then
    # Drop lines whose RHS starts with ${{ secrets.* }} or ${{ vars.* }} or $FOO/${FOO}
    unsafe=$(printf '%s\n' "$matches" \
      | sed -E 's/^[^:]*:[0-9]+://g' \
      | grep -Ev '\{\{\s*(secrets|vars)\.[A-Za-z0-9_]+\s*\}\}' \
      | grep -Ev '(=|:)[[:space:]]*\$[{]?[A-Za-z_][A-Za-z0-9_]*[}]?' \
      | sed -E 's/^/PLACEHOLDER:/' || true)

    # Reattach path:line by using a placeholder trick; if nothing remains, unsafe is empty
    if [[ -n "$unsafe" ]]; then
      # Pull back the original path:line from matches to print properly masked output
      while IFS= read -r line; do
        # Find the corresponding original line
        base=$(echo "$line" | sed 's/^PLACEHOLDER://')
        orig=$(printf '%s\n' "$matches" | grep -F -- "$base" || true)
        [[ -z "$orig" ]] && continue
        if [[ $found != true ]]; then
          echo "⚠️  Found potential secret assignment: $key"
          echo "--------------------------------------------------"
        fi
        echo "$orig" \
          | sed -E "s/(${key})[[:space:]]*(=|:)[[:space:]]*[^[:space:]]+/\1\2 ********/g"
        found=true
      done <<< "$unsafe"
      [[ $found == true ]] && echo "--------------------------------------------------"
    fi
  fi
done

# 2) DSNs anywhere (ignore helper/example file)
echo "Checking for DSNs: postgresql://"
dsn=$(git grep -In -E "$DSN_REGEX" -- \
        ':!tools/scan-*.sh' ':!*.md' ':!*.MD' \
        ':!tools/java/GrantRole.java' || true)
if [[ -n "$dsn" ]]; then
  # Drop lines using GitHub secrets/vars or obvious examples
  dsn=$(printf '%s\n' "$dsn" \
        | grep -Ev '\{\{\s*(secrets|vars)\.' \
        | grep -Ev '(^|\s)(e\.g\.|example|EXAMPLE)\b' || true)
  if [[ -n "$dsn" ]]; then
    echo "⚠️  Found potential DSN"
    echo "--------------------------------------------------"
    echo "$dsn" | sed -E 's#postgresql://[^[:space:]"]+#postgresql://********#g'
    echo "--------------------------------------------------"
    found=true
  fi
fi

if $found; then
  echo "❌ Secrets detected. Please remove them or move to env files before committing."
  exit 1
else
  echo "✅ No secrets found."
fi
