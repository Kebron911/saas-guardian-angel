
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id?: string;
  published: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
  featured_image?: string;
  views?: number; // Make views optional since it doesn't exist in the database
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPostWithCategory extends BlogPost {
  categories: BlogCategory[];
}

// Input types for creating/updating blog posts and categories
export interface BlogPostInput {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id?: string;
  published?: boolean;
  published_at?: string;
  featured_image?: string;
}

export interface BlogCategoryInput {
  name: string;
  slug: string;
}
