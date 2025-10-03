#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-https://la-cantina.replit.app}"

echo "=== Security Headers Check for $BASE ==="
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""

echo "--- Homepage Headers ---"
curl -s -D - "$BASE/" -o /dev/null | grep -iE '(strict-transport-security|content-security-policy|x-content-type-options|referrer-policy|permissions-policy|cross-origin|cache-control)' || echo "No security headers found"

echo ""
echo "--- Static Asset Headers (if available) ---"
# Try to find a static asset
curl -s -D - "$BASE/assets/index.js" -o /dev/null 2>/dev/null | grep -iE '(cache-control|content-type)' || echo "Static asset not found or no cache headers"

echo ""
echo "--- API Health Endpoint ---"
curl -s "$BASE/api/health" | head -c 200

echo ""
echo ""
echo "=== Headers check complete ==="
