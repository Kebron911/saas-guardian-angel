
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, BlogCategory, BlogPostWithCategory } from "@/types/blog";

interface UseBlogPageDataResult {
  posts: BlogPostWithCategory[];
  post: BlogPostWithCategory | null;
  categories: BlogCategory[];
  isLoading: boolean;
  error: string | null;
  incrementViews: (postId: string) => Promise<void>;
}

export const useBlogPageData = (slug?: string): UseBlogPageDataResult => {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [post, setPost] = useState<BlogPostWithCategory | null>(null);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogPosts = async () => {
    try {
      setIsLoading(true);
      console.log("Fetching blog posts...");
      
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          blog_post_categories!inner(
            blog_categories(*)
          )
        `)
        .eq("published", true)
        .order("published_at", { ascending: false });

      const { data: posts, error } = await query;

      if (error) {
        console.error("Error fetching posts:", error);
        throw error;
      }

      console.log("Raw posts data:", posts);

      const processedPosts: BlogPostWithCategory[] = posts?.map((post: any) => ({
        ...post,
        views: 0, // Default views since it doesn't exist in the database yet
        categories: post.blog_post_categories?.map((pc: any) => pc.blog_categories) || []
      })) || [];

      console.log("Processed posts:", processedPosts);
      setPosts(processedPosts);
    } catch (err: any) {
      console.error("Error in fetchBlogPosts:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setIsLoading(true);
      console.log("Fetching blog post with slug:", postSlug);
      
      const { data: post, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_post_categories(
            blog_categories(*)
          )
        `)
        .eq("slug", postSlug)
        .eq("published", true)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
        throw error;
      }

      console.log("Raw post data:", post);

      const processedPost: BlogPostWithCategory = {
        ...post,
        views: 0, // Default views since it doesn't exist in the database yet
        categories: post.blog_post_categories?.map((pc: any) => pc.blog_categories) || []
      };

      console.log("Processed post:", processedPost);
      setPost(processedPost);
    } catch (err: any) {
      console.error("Error in fetchBlogPost:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data: categories, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name", { ascending: true });

      if (error) {
        console.error("Error fetching categories:", error);
        throw error;
      }

      console.log("Categories fetched:", categories);
      setCategories(categories || []);
    } catch (err: any) {
      console.error("Error in fetchCategories:", err);
      setError(err.message);
    }
  };

  const incrementViews = async (postId: string) => {
    try {
      // Since views column doesn't exist yet, we'll just log this action
      console.log("Would increment views for post:", postId);
    } catch (err: any) {
      console.error("Error in incrementViews:", err);
    }
  };

  useEffect(() => {
    if (slug) {
      fetchBlogPost(slug);
    } else {
      fetchBlogPosts();
    }
    fetchCategories();
  }, [slug]);

  return {
    posts,
    post,
    categories,
    isLoading,
    error,
    incrementViews,
  };
};

// Export the single post hook that BlogPostContent expects
export const useSingleBlogPost = (slug?: string) => {
  const { post, isLoading, error, incrementViews } = useBlogPageData(slug);
  
  useEffect(() => {
    if (post && post.id) {
      incrementViews(post.id);
    }
  }, [post, incrementViews]);
  
  return { post, isLoading, error };
};
