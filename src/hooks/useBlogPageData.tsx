
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, BlogPostWithCategory } from "@/types/blog";

export const useBlogPageData = () => {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get blog posts with categories
      const { data: postsData, error: postsError } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_post_categories(
            blog_categories(*)
          )
        `)
        .eq("published", true)
        .order("published_at", { ascending: false });

      if (postsError) throw postsError;

      // Transform the data to match our BlogPostWithCategory interface
      const transformedPosts: BlogPostWithCategory[] = postsData.map((post) => ({
        ...post,
        views: 0, // Default views to 0 since it doesn't exist in database
        categories: post.blog_post_categories?.map((pc: any) => pc.blog_categories) || []
      }));

      setPosts(transformedPosts);
    } catch (err: any) {
      console.error("Error fetching blog posts:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPostBySlug = async (slug: string): Promise<BlogPostWithCategory | null> => {
    try {
      const { data: postData, error: postError } = await supabase
        .from("blog_posts")
        .select(`
          *,
          blog_post_categories(
            blog_categories(*)
          )
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (postError) throw postError;

      // Transform the data
      const transformedPost: BlogPostWithCategory = {
        ...postData,
        views: 0, // Default views to 0
        categories: postData.blog_post_categories?.map((pc: any) => pc.blog_categories) || []
      };

      return transformedPost;
    } catch (err: any) {
      console.error("Error fetching blog post by slug:", err);
      return null;
    }
  };

  const incrementViews = async (slug: string) => {
    try {
      // Since views column doesn't exist, we'll just log this for now
      console.log(`Would increment views for post: ${slug}`);
    } catch (err: any) {
      console.error("Error incrementing views:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    isLoading,
    error,
    fetchPosts,
    fetchPostBySlug,
    incrementViews
  };
};
