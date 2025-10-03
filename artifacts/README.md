# Artifacts - La Cantina Berlin Security Audit

This directory contains all artifacts generated during the comprehensive security and quality audit of La Cantina Berlin restaurant website.

## Generated Files

### Probe Scripts Output
- **`probe.txt`** - HTTP status codes for all public routes (200 OK verification)
- **`api-probe.txt`** - API security testing (authentication enforcement on protected endpoints)
- **`headers.txt`** - Security headers verification (HSTS, CSP, COOP, etc.)

### Static Snapshots
- **`robots.txt`** - Robots.txt snapshot from deployed site
- **`sitemap.xml`** - XML sitemap with i18n (de/en) support
- **`audit.txt`** - npm audit results (0 vulnerabilities)

### Test Reports
- **`checklist.md`** - Comprehensive PASS/FAIL audit checklist with evidence

### Not Generated (Environment Limitations)
The following artifacts could not be generated in the Replit environment:
- `playwright-report/` - E2E test results (requires browser installation)
- `axe-*.json` - Accessibility scan results (requires browser)
- `lighthouse.json` - Performance metrics (requires Chrome/system deps)

## How to Run Tests Locally or in CI/CD

### Playwright E2E Tests
```bash
# Install browsers (works in local/CI environment)
npx playwright install chromium --with-deps

# Run tests
npm run test:e2e

# View report
npx playwright show-report artifacts/playwright-report
```

### Probe Scripts (Works anywhere with curl)
```bash
# Route probe
./scripts/probe.sh https://la-cantina.replit.app

# API security probe
./scripts/api-probe.sh https://la-cantina.replit.app

# Security headers check
./scripts/headers-check.sh https://la-cantina.replit.app
```

### Lighthouse Performance Audit
```bash
# Requires Chrome/Chromium installed
npx lighthouse https://la-cantina.replit.app \
  --output json \
  --output-path artifacts/lighthouse.json \
  --chrome-flags="--headless"
```

## Summary

### ✅ PASSING
- All public routes return 200 OK
- Security headers properly configured
- API authentication enforced (401 for unauthenticated CUD operations)
- Health endpoints functional
- 0 npm vulnerabilities
- Rate limiting implemented
- SEO infrastructure (robots.txt, sitemap.xml)

### ⚠️ PARTIAL
- Admin login requires JavaScript for submission (needs progressive enhancement)
- Static asset caching could be improved
- Sitemap domain uses lacantina-berlin.de instead of la-cantina.replit.app

### ❌ SKIPPED
- Playwright E2E tests (environment limitation)
- Lighthouse performance audit (environment limitation)
- Automated accessibility testing (environment limitation)

---

**Generated**: October 3, 2025  
**Target**: https://la-cantina.replit.app  
**Architecture**: Vite/Express (React SPA + Express backend)
