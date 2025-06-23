-- Insert sample admin activity data
INSERT INTO admin_activity_log (id, event_type, performed_by, details, created_at, ip_address, user_agent)
SELECT
  uuid_generate_v4(),
  event_type,
  user_id,
  details,
  created_at,
  ip_address,
  user_agent
FROM (VALUES
  ('login', (SELECT id FROM users LIMIT 1), 'Admin logged in successfully', NOW() - INTERVAL '1 hour', '192.168.1.101', 'Mozilla/5.0'),
  ('update_user', (SELECT id FROM users LIMIT 1), 'Updated user profile settings', NOW() - INTERVAL '2 hours', '192.168.1.102', 'Mozilla/5.0'),
  ('view_logs', (SELECT id FROM users LIMIT 1), 'Viewed system logs', NOW() - INTERVAL '3 hours', '192.168.1.103', 'Mozilla/5.0')
) AS data(event_type, user_id, details, created_at, ip_address, user_agent);
