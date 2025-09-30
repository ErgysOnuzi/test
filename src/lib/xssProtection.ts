/**
 * XSS Protection utilities for input sanitization
 * Prevents Cross-Site Scripting attacks by sanitizing user input
 */

/**
 * Escape HTML characters to prevent XSS attacks
 */
export function escapeHtml(text: string): string {
  const htmlEscapeMap: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return text.replace(/[&<>"'/]/g, (match) => htmlEscapeMap[match] || match);
}

/**
 * Sanitize text input by escaping ALL HTML to prevent injection attacks
 */
export function sanitizeTextInput(input: string): string {
  if (typeof input !== 'string') return '';

  // First trim and limit length
  const trimmed = input.trim().slice(0, 1000);

  // Escape ALL HTML characters to prevent any markup injection
  return escapeHtml(trimmed);
}

/**
 * Validate and sanitize email addresses
 */
export function sanitizeEmail(email: string): string {
  if (typeof email !== 'string') return '';

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const sanitized = email.trim().toLowerCase();

  return emailRegex.test(sanitized) ? sanitized : '';
}

/**
 * Validate and sanitize phone numbers
 */
export function sanitizePhoneNumber(phone: string): string {
  if (typeof phone !== 'string') return '';

  // Remove all non-digit characters except + at the beginning
  const cleaned = phone.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');

  // Validate format (basic international format)
  const phoneRegex = /^(\+\d{1,3})?[\d\s-()]{7,15}$/;
  return phoneRegex.test(cleaned) ? cleaned : '';
}

/**
 * Sanitize URLs to prevent malicious links
 */
export function sanitizeUrl(url: string): string {
  if (typeof url !== 'string') return '';

  try {
    const parsed = new URL(url);

    // Only allow http, https, and mailto protocols
    if (!['http:', 'https:', 'mailto:'].includes(parsed.protocol)) {
      return '';
    }

    return parsed.toString();
  } catch {
    return '';
  }
}

/**
 * Comprehensive input sanitization for contact forms
 * All text fields are HTML-escaped to prevent XSS attacks
 */
export function sanitizeContactInput(input: {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  subject?: string;
}) {
  return {
    name: input.name ? sanitizeTextInput(input.name) : '',
    email: input.email ? sanitizeEmail(input.email) : '',
    phone: input.phone ? sanitizePhoneNumber(input.phone) : '',
    message: input.message ? sanitizeTextInput(input.message) : '',
    subject: input.subject ? sanitizeTextInput(input.subject) : '',
  };
}

/**
 * Test XSS protection with malicious payloads
 * Use this for security testing - should return harmless escaped strings
 */
export function testXSSProtection() {
  const maliciousInputs = [
    '<script>alert("XSS")</script>',
    '<img src="x" onerror="alert(1)">',
    '<svg onload="alert(1)">',
    '<style>body { background: red; }</style>',
    'javascript:alert(1)',
    '<div onclick="alert(1)">Click me</div>',
  ];

  return maliciousInputs.map((input) => ({
    original: input,
    sanitized: sanitizeTextInput(input),
  }));
}
