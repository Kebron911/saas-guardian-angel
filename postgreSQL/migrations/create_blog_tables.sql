
-- Create the blog-related tables if they don't exist

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id UUID,
    published BOOLEAN DEFAULT FALSE,
    published_at TIMESTAMP WITH TIME ZONE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_post_categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL,
    category_id UUID NOT NULL,
    UNIQUE(post_id, category_id)
);

-- Create blog_views table for tracking views
CREATE TABLE IF NOT EXISTS blog_views (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL,
    viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_comments table for tracking comments
CREATE TABLE IF NOT EXISTS blog_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID NOT NULL,
    author_name VARCHAR(255),
    content TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample blog posts
INSERT INTO blog_posts (id, title, slug, content, excerpt, published, published_at, views) VALUES
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'AI in 2025', 'ai-in-2025', 'Full content about AI in 2025 and its implications for businesses and society...', 'AI is changing everything...', TRUE, NOW(), 15),
    ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Healthy Living Tips', 'healthy-living-tips', 'Full content on lifestyle and health tips for modern living...', 'Stay healthy with these tips...', TRUE, NOW(), 23),
    ('33333333-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Post-Quantum Cryptography', 'post-quantum-crypto', 'Advanced cryptographic content discussing the future of encryption...', 'Quantum computing and encryption...', FALSE, NULL, 0)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample categories
INSERT INTO blog_categories (id, name, slug) VALUES
    ('11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Technology', 'technology'),
    ('22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Health', 'health'),
    ('33333333-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Lifestyle', 'lifestyle')
ON CONFLICT (slug) DO NOTHING;

-- Insert category relationships
INSERT INTO blog_post_categories (post_id, category_id) VALUES
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '22222222-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
    ('33333333-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '11111111-aaaa-aaaa-aaaa-aaaaaaaaaaaa')
ON CONFLICT (post_id, category_id) DO NOTHING;

-- Add some sample views and comments
INSERT INTO blog_views (post_id) VALUES
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
    ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb')
ON CONFLICT DO NOTHING;

INSERT INTO blog_comments (post_id, author_name, content) VALUES
    ('11111111-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'John Doe', 'Great article about AI!'),
    ('22222222-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Jane Smith', 'Very helpful health tips.')
ON CONFLICT DO NOTHING;
