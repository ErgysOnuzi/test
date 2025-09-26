-- La Cantina Berlin Database Export
-- Generated on: 2025-09-26
-- PostgreSQL Database Backup

-- Contact Messages
INSERT INTO contact_messages (id, name, email, phone, subject, message, status, priority, created_at, updated_at) VALUES
(1, 'Test User', 'test@example.com', NULL, NULL, 'Testing contact form functionality', 'new', 'normal', '2025-09-26 01:33:36.284561', '2025-09-26 01:33:36.284561'),
(2, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;', 'hacker@example.com', NULL, NULL, '&lt;img src=x onerror=alert(1)&gt;', 'new', 'normal', '2025-09-26 01:33:38.451828', '2025-09-26 01:33:38.451828'),
(3, 'Final Test', 'test@example.com', NULL, NULL, 'Final verification test', 'new', 'normal', '2025-09-26 01:48:56.652203', '2025-09-26 01:48:56.652203'),
(4, 'Test User', 'test@example.com', NULL, NULL, 'Testing contact functionality', 'new', 'normal', '2025-09-26 01:56:50.114315', '2025-09-26 01:56:50.114315'),
(5, '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;', 'hacker@example.com', NULL, NULL, '&lt;img src=x onerror=alert(1)&gt;&lt;style&gt;body{background:red}&lt;&#x2F;style&gt;', 'new', 'normal', '2025-09-26 01:57:02.330207', '2025-09-26 01:57:02.330207'),
(6, 'Integration Test User', 'integration@test.com', NULL, NULL, 'End-to-end testing successful', 'new', 'normal', '2025-09-26 01:59:14.424059', '2025-09-26 01:59:14.424059');

-- Reservations
INSERT INTO reservations (id, name, phone, email, date, time, guests, status, notes, created_at, updated_at) VALUES
(1, 'Test Guest', '+493012345678', NULL, '2024-01-15', '19:00', 4, 'pending', NULL, '2025-09-26 01:33:37.74547', '2025-09-26 01:33:37.74547'),
(2, 'Test Guest', '+493012345678', NULL, '2024-02-15', '19:30', 2, 'pending', NULL, '2025-09-26 01:56:52.878862', '2025-09-26 01:56:52.878862'),
(3, 'Final Test Guest', '+493087654321', NULL, '2024-03-15', '20:00', 4, 'pending', NULL, '2025-09-26 01:59:16.122761', '2025-09-26 01:59:16.122761');

-- Admin Users
INSERT INTO admin_users (id, username, email, password_hash, role, is_active, last_login, created_at, updated_at) VALUES
(1, 'admin', 'admin@lacantina.berlin', '$2a$12$XLPfXYZabcdef123456789O.MNOpqrs.tuvwxyz123456789abcdef', 'admin', true, NULL, '2025-09-25 18:40:57.287797', '2025-09-25 18:40:57.287797');

-- Feedbacks
INSERT INTO feedbacks (id, name, email, rating, comment, status, is_public, reservation_id, created_at, updated_at) VALUES
(1, 'ergys onuzi', 'ergysonuzi12@gmail.com', 5, 'Outstanding experience—delicious food, attentive service, and a warm atmosphere. Every detail was perfect. A true 5-star restaurant.', 'pending', false, NULL, '2025-09-25 12:14:38.806432', '2025-09-25 12:14:38.806432'),
(2, 'ergys', 'ergysonuzi12@gmail.com', 5, 'Outstanding experience—delicious food, attentive service, and a warm atmosphere. Every detail was perfect. A true 5-star restaurant.', 'approved', true, NULL, '2025-09-25 12:47:07.672951', '2025-09-25 12:47:07.672951');

-- Note: Menu items and gallery data are extensive (65+ menu items, 50+ gallery images)
-- See separate files: menu_items.json and gallery.json for complete data
-- Events and event_bookings tables are empty (no data to export)