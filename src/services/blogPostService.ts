import { supabase } from "@/integrations/supabase/client";
import { BlogPostInput, BlogPostWithCategory } from "@/types/blog";
import { apiClient } from "@/lib/api-client";
import { toast } from "@/hooks/use-toast";

export const createBlogPost = async (post: BlogPostInput, categoryIds: string[]) => {
  try {
    console.log("Creating post:", post);
    console.log("Category IDs:", categoryIds);
    
    // Prepare the post data for the PostgreSQL API
    const postData = {
      title: post.title,
      slug: post.slug,
      content: post.content,
      excerpt: post.excerpt || "",
      featured_image: post.featured_image || "",
      author_id: null, // Keep as null since backend now supports it
      published: post.published,
      category_id: categoryIds.length > 0 ? categoryIds[0] : null
    };

    console.log("Sending post data to API:", postData);

    // Use the existing apiClient to create the post
    const result = await apiClient.post('/blog/posts', postData);
    console.log("Post created successfully:", result);
    
    toast({
      title: "Success",
      description: "Blog post created successfully.",
    });
    
    return result;
  } catch (err: any) {
    console.error("Error creating post:", err);
    
    // Better error message handling
    let errorMessage = "Unknown error";
    if (err.message) {
      errorMessage = err.message;
    } else if (typeof err === 'string') {
      errorMessage = err;
    } else if (err.detail) {
      if (Array.isArray(err.detail)) {
        errorMessage = err.detail.map((d: any) => d.msg).join(", ");
      } else {
        errorMessage = err.detail;
      }
    }
    
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
    // Update the post
    const { error: postError } = await supabase
      .from("blog_posts")
      .update(post)
      .eq("id", id);
    
    if (postError) throw postError;

    // Delete existing category relationships
    const { error: deleteError } = await supabase
      .from("blog_post_categories")
      .delete()
      .eq("post_id", id);

    if (deleteError) throw deleteError;
    
    // Insert new category relationships
    if (categoryIds.length > 0) {
      const categoryRelations = categoryIds.map(categoryId => ({
        post_id: id,
        category_id: categoryId
      }));

      const { error: categoriesError } = await supabase
        .from("blog_post_categories")
        .insert(categoryRelations);

      if (categoriesError) throw categoriesError;
    }
    
    toast({
      title: "Success",
      description: "Blog post updated successfully.",
    });
    
    return true;
  } catch (err: any) {
    console.error("Error updating post:", err);
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
    // Delete from Supabase using the direct client
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    toast({
      title: "Success",
      description: "Blog post deleted successfully.",
    });
    
    return true;
  } catch (err) {
    console.error("Error deleting post:", err);
    toast({
      title: "Error",
      description: "Failed to delete blog post. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};
