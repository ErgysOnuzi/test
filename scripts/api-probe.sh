#!/usr/bin/env bash
set -euo pipefail
BASE="${1:-https://la-cantina.replit.app}"

echo "=== API Security Probe for $BASE ==="
echo "Timestamp: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo ""
echo "Testing unauthenticated access to protected endpoints..."
echo ""

declare -a eps=("/api/menu" "/api/reservations" "/api/gallery" "/api/events" "/api/contact" "/api/feedback" "/api/admin/bookings")

for ep in "${eps[@]}"; do
  echo "--- Testing: $ep ---"
  
  # GET should work for public endpoints, protected for admin
  get_code=$(curl -s -o /dev/null -w "%{http_code}" "$BASE$ep" || echo "000")
  echo "GET  $ep => $get_code"
  
  # POST without auth should fail or require validation
  post_code=$(curl -s -o /dev/null -w "%{http_code}" -X POST -H 'content-type: application/json' -d '{}' "$BASE$ep" || echo "000")
  echo "POST $ep => $post_code (expected: 400/401/403)"
  
  # PUT without auth should fail
  put_code=$(curl -s -o /dev/null -w "%{http_code}" -X PUT -H 'content-type: application/json' -d '{}' "$BASE$ep/1" || echo "000")
  echo "PUT  $ep/1 => $put_code (expected: 401/403/404)"
  
  # DELETE without auth should fail
  del_code=$(curl -s -o /dev/null -w "%{http_code}" -X DELETE "$BASE$ep/1" || echo "000")
  echo "DELETE $ep/1 => $del_code (expected: 401/403/404)"
  
  echo ""
done

echo "=== API Probe complete ==="
