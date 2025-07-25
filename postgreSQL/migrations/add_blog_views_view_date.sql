-- Migration: Add view_date column to blog_views table
ALTER TABLE blog_views ADD COLUMN IF NOT EXISTS view_date TIMESTAMP DEFAULT NOW();
