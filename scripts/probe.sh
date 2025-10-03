#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-https://la-cantina.replit.app}"
paths=( "/" "/en" "/de" "/menu" "/en/menu" "/reservations" "/en/reservations" "/contact" "/en/contact" "/feedback" "/en/feedback" "/gallery" "/en/gallery" "/events" "/en/events" "/en/admin/login" "/de/admin/login" "/not-a-real-route" "/api/health" "/api/ready" "/sitemap.xml" "/robots.txt" )

echo "=== Route Probe for $BASE ==="
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""

for p in "${paths[@]}"; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$p" || echo "000")
  echo "$code  $BASE$p"
done

echo ""
echo "=== Probe complete ==="
