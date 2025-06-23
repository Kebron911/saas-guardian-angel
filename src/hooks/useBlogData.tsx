
import { useState, useEffect } from "react";
import { BlogPost, BlogCategory, BlogPostWithCategory, BlogPostInput, BlogCategoryInput } from "@/types/blog";
import { fetchBlogData, fetchBlogCategories } from "@/services/blogDataService";
import { createBlogPost, updateBlogPost, deleteBlogPost } from "@/services/blogPostService";
import { createBlogCategory, updateBlogCategory, deleteBlogCategory } from "@/services/blogCategoryService";

export const useBlogData = () => {
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { posts: fetchedPosts, categories: fetchedCategories } = await fetchBlogData();
      
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setIsLoading(false);
    } catch (err: any) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const createPost = async (post: BlogPostInput, categoryIds: string[]) => {
    const result = await createBlogPost(post, categoryIds);
    await fetchPosts(); // Refresh the posts data
    return result;
  };

  const updatePost = async (id: string, post: Partial<BlogPostInput>, categoryIds: string[]) => {
    const result = await updateBlogPost(id, post, categoryIds);
    await fetchPosts(); // Refresh posts
    return result;
  };

  const deletePost = async (id: string) => {
    const result = await deleteBlogPost(id);
    await fetchPosts();
    return result;
  };

  const createCategory = async (category: BlogCategoryInput) => {
    const result = await createBlogCategory(category);
    
    // Refresh categories
    const updatedCategories = await fetchBlogCategories();
    setCategories(updatedCategories);
    
    return result;
  };

  const updateCategory = async (id: string, category: Partial<BlogCategoryInput>) => {
    const result = await updateBlogCategory(id, category);
    
    // Refresh categories
    const updatedCategories = await fetchBlogCategories();
    setCategories(updatedCategories);
    
    // Refresh posts to update their categories
    await fetchPosts();
    
    return result;
  };

  const deleteCategory = async (id: string) => {
    const result = await deleteBlogCategory(id);
    
    // Refresh categories
    const updatedCategories = await fetchBlogCategories();
    setCategories(updatedCategories);
    
    // Refresh posts to update their categories
    await fetchPosts();
    
    return result;
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    posts,
    categories,
    isLoading,
    error,
    fetchPosts,
    createPost,
    updatePost,
    deletePost,
    createCategory,
    updateCategory,
    deleteCategory
  };
};
