
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  published_at?: string;
  views: number;
  created_at: string;
  updated_at: string;
  featured_image?: string;
  category?: BlogCategory;
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

// Add this new type for creating/updating blog posts
export interface BlogPostInput {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  published: boolean;
  published_at?: string;
  featured_image?: string;
}

// Add this new type for creating/updating blog categories
export interface BlogCategoryInput {
  name: string;
  slug: string;
}
