import { BlogPostInput, BlogPostWithCategory } from "@/types/blog";
import { apiClient } from "@/lib/api-client";
import { toast } from "@/hooks/use-toast";

export const createBlogPost = async (post: BlogPostInput, categoryIds: string[]) => {
  try {
    const postData = {
      ...post,
      category_ids: categoryIds,
    };
    const result = await apiClient.post('/blog/posts', postData);
    toast({
      title: "Success",
      description: "Blog post created successfully.",
    });
    return result;
  } catch (err: any) {
    let errorMessage = err.message || (typeof err === 'string' ? err : 'Unknown error');
    toast({
      title: "Error",
      description: "Failed to create blog post: " + errorMessage,
      variant: "destructive"
    });
    throw new Error(errorMessage);
  }
};

export const updateBlogPost = async (id: string, post: Partial<BlogPostInput>, categoryIds: string[]) => {
  try {
    const postData = {
      ...post,
      category_ids: categoryIds,
    };
    const result = await apiClient.put(`/blog/posts/${id}`, postData);
    toast({
      title: "Success",
      description: "Blog post updated successfully.",
    });
    return result;
  } catch (err: any) {
    toast({
      title: "Error",
      description: "Failed to update blog post. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};

export const deleteBlogPost = async (id: string) => {
  try {
    await apiClient.delete(`/blog/posts/${id}`);
    toast({
      title: "Success",
      description: "Blog post deleted successfully.",
    });
    return true;
  } catch (err: any) {
    toast({
      title: "Error",
      description: "Failed to delete blog post. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};
