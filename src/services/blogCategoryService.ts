
import { supabase } from "@/integrations/supabase/client";
import { BlogCategoryInput } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

export const createBlogCategory = async (category: BlogCategoryInput) => {
  try {
    console.log("Creating category:", category);
    const { data, error } = await supabase
      .from("blog_categories")
      .insert(category)
      .select()
      .single();

    if (error) {
      console.error("Error creating category:", error);
      throw error;
    }
    
    console.log("Category created:", data);
    
    toast({
      title: "Success",
      description: "Category created successfully.",
    });
    
    return data;
  } catch (err: any) {
    console.error("Error creating category:", err);
    toast({
      title: "Error",
      description: "Failed to create category: " + (err.message || "Unknown error"),
      variant: "destructive"
    });
    throw err;
  }
};

export const updateBlogCategory = async (id: string, category: Partial<BlogCategoryInput>) => {
  try {
    const { error } = await supabase
      .from("blog_categories")
      .update(category)
      .eq("id", id);

    if (error) throw error;
    
    toast({
      title: "Success",
      description: "Category updated successfully.",
    });
    
    return true;
  } catch (err: any) {
    console.error("Error updating category:", err);
    toast({
      title: "Error",
      description: "Failed to update category. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};

export const deleteBlogCategory = async (id: string) => {
  try {
    const { error } = await supabase
      .from("blog_categories")
      .delete()
      .eq("id", id);

    if (error) throw error;
    
    toast({
      title: "Success",
      description: "Category deleted successfully.",
    });
    
    return true;
  } catch (err: any) {
    console.error("Error deleting category:", err);
    toast({
      title: "Error",
      description: "Failed to delete category. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};
