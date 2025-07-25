import { BlogCategoryInput } from "@/types/blog";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";

export const createBlogCategory = async (category: BlogCategoryInput) => {
  try {
    const data = await apiClient.post("/blog/categories", category);
    toast({
      title: "Success",
      description: "Category created successfully.",
    });
    return data;
  } catch (err: any) {
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
    await apiClient.put(`/blog/categories/${id}`, category);
    toast({
      title: "Success",
      description: "Category updated successfully.",
    });
    return true;
  } catch (err: any) {
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
    await apiClient.delete(`/blog/categories/${id}`);
    toast({
      title: "Success",
      description: "Category deleted successfully.",
    });
    return true;
  } catch (err: any) {
    toast({
      title: "Error",
      description: "Failed to delete category. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};
