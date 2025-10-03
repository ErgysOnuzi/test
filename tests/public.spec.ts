import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import * as fs from 'fs'
import * as path from 'path'

test.describe('Public Routes', () => {
  test('home page loads and has correct language', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    
    const html = page.locator('html')
    const lang = await html.getAttribute('lang')
    expect(['de', 'en']).toContain(lang)
    
    // Check for language toggle
    const langToggle = page.locator('text=/DE|EN/i').first()
    await expect(langToggle).toBeVisible()
  })

  test('english homepage CTAs are visible', async ({ page }) => {
    await page.goto('/en', { waitUntil: 'networkidle' })
    
    // Check for key CTAs
    const reserveButton = page.getByRole('link', { name: /reserve|reservation|book/i }).first()
    await expect(reserveButton).toBeVisible({ timeout: 10000 })
  })

  test('german homepage CTAs are visible', async ({ page }) => {
    await page.goto('/de', { waitUntil: 'networkidle' })
    
    // Check for key CTAs
    const reserveButton = page.getByRole('link', { name: /reservierung|tisch/i }).first()
    await expect(reserveButton).toBeVisible({ timeout: 10000 })
  })

  test('menu page loads', async ({ page }) => {
    await page.goto('/en/menu', { waitUntil: 'networkidle' })
    
    // Wait for menu items to load
    await page.waitForSelector('text=/menu|speisekarte/i', { timeout: 10000 })
    const heading = page.locator('h1, h2').filter({ hasText: /menu/i }).first()
    await expect(heading).toBeVisible()
  })

  test('reservations page loads', async ({ page }) => {
    await page.goto('/en/reservations', { waitUntil: 'networkidle' })
    
    // Check for reservation form
    const heading = page.locator('h1, h2').filter({ hasText: /reserve|reservation/i }).first()
    await expect(heading).toBeVisible()
  })

  test('contact page loads', async ({ page }) => {
    await page.goto('/en/contact', { waitUntil: 'networkidle' })
    
    // Check for contact form
    const heading = page.locator('h1, h2').filter({ hasText: /contact/i }).first()
    await expect(heading).toBeVisible()
  })

  test('feedback page loads', async ({ page }) => {
    await page.goto('/en/feedback', { waitUntil: 'networkidle' })
    
    // Check for feedback form
    const heading = page.locator('h1, h2').filter({ hasText: /feedback|review/i }).first()
    await expect(heading).toBeVisible()
  })
})

test.describe('Admin', () => {
  test('admin login page is accessible', async ({ page }) => {
    await page.goto('/en/admin/login', { waitUntil: 'domcontentloaded' })
    
    // Check for login form elements
    await expect(page.locator('form, [role="form"]')).toBeVisible({ timeout: 10000 })
    
    // Check for email/username input
    const emailInput = page.locator('input[type="email"], input[type="text"]').first()
    await expect(emailInput).toBeVisible()
    
    // Check for password input
    const passwordInput = page.locator('input[type="password"]').first()
    await expect(passwordInput).toBeVisible()
  })
})

test.describe('Accessibility', () => {
  test('home page has no accessibility violations', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' })
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze()
    
    // Save results
    const artifactsDir = path.join(process.cwd(), 'artifacts')
    if (!fs.existsSync(artifactsDir)) {
      fs.mkdirSync(artifactsDir, { recursive: true })
    }
    fs.writeFileSync(
      path.join(artifactsDir, 'axe-home.json'),
      JSON.stringify(accessibilityScanResults, null, 2)
    )
    
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('menu page has no critical accessibility violations', async ({ page }) => {
    await page.goto('/en/menu', { waitUntil: 'networkidle' })
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze()
    
    // Save results
    const artifactsDir = path.join(process.cwd(), 'artifacts')
    fs.writeFileSync(
      path.join(artifactsDir, 'axe-menu.json'),
      JSON.stringify(accessibilityScanResults, null, 2)
    )
    
    // Filter for critical violations only
    const criticalViolations = accessibilityScanResults.violations.filter(
      v => v.impact === 'critical' || v.impact === 'serious'
    )
    expect(criticalViolations).toEqual([])
  })
})

test.describe('API Health', () => {
  test('health endpoint returns ok', async ({ request }) => {
    const response = await request.get('/api/health')
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data.status).toBe('ok')
    expect(data.version).toBeDefined()
    expect(data.ts).toBeDefined()
  })

  test('ready endpoint returns ready', async ({ request }) => {
    const response = await request.get('/api/ready')
    expect(response.ok()).toBeTruthy()
    
    const data = await response.json()
    expect(data.status).toBe('ready')
    expect(data.database).toBe('connected')
    expect(data.version).toBeDefined()
  })
})
