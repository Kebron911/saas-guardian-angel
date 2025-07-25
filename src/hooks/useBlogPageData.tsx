import { useState, useEffect } from "react";
import { BlogPost, BlogCategory, BlogPostWithCategory } from "@/types/blog";
import { apiClient } from "@/lib/api-client";

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
      const postsData = await apiClient.get("/blog/posts/published");
      const processedPosts: BlogPostWithCategory[] = postsData.map((post: any) => {
        let categoryIds = post.category_ids;
        if (typeof categoryIds === "string" && categoryIds.startsWith("{")) {
          categoryIds = categoryIds.slice(1, -1).split(",").filter(Boolean);
        } else if (!Array.isArray(categoryIds)) {
          categoryIds = [];
        }
        post.category_ids = categoryIds;
        const categories = (categoryIds || []).map((id: string, idx: number) => ({
          id,
          name: post.category_names?.[idx] || "",
          slug: "",
          created_at: ""
        }));
        // Ensure excerpt is present, fallback to first 150 chars of content if missing
        let excerpt = post.excerpt;
        if (!excerpt && post.content) {
          const plain = post.content.replace(/<[^>]+>/g, '').replace(/[#*_`~\[\]]/g, '');
          excerpt = plain.slice(0, 150) + (plain.length > 150 ? '...' : '');
        }
        // Ensure featured_image is present (may be empty string)
        let featured_image = post.featured_image || '';
        return { ...post, categories, excerpt, featured_image };
      });
      setPosts(processedPosts);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBlogPost = async (postSlug: string) => {
    try {
      setIsLoading(true);
      const data = await apiClient.get(`/blog/posts/slug/${postSlug}`);
      let ids = data.category_ids;
      if (typeof ids === "string" && ids.startsWith("{")) {
        ids = ids.slice(1, -1).split(",").filter(Boolean);
      } else if (!Array.isArray(ids)) {
        ids = [];
      }
      // Always set category_ids as array of strings
      data.category_ids = ids;
      const categories = (ids || []).map((id: string, idx: number) => ({
        id,
        name: data.category_names?.[idx] || "",
        slug: "",
        created_at: ""
      }));
      setPost({ ...data, categories });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await apiClient.get("/blog/categories");
      setCategories(categoriesData || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const incrementViews = async (postId: string) => {
    try {
      await apiClient.post(`/blog/posts/${postId}/increment-views`, {});
    } catch (err: any) {
      // Optionally handle error
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

export const useSingleBlogPost = (slug?: string) => {
  const { post, isLoading, error, incrementViews } = useBlogPageData(slug);
  useEffect(() => {
    if (post && post.id) {
      incrementViews(post.id);
    }
  }, [post, incrementViews]);
  return { post, isLoading, error };
};
