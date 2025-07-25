import { BlogPostWithCategory, BlogCategory } from "@/types/blog";
import { toast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";

export const fetchBlogData = async () => {
  try {
    console.log("Admin - Fetching blog data...");
    
    // Fetch all posts
    const postsData = await apiClient.get("/blog/posts/published");
    // Fetch all categories
    const categoriesData = await apiClient.get("/blog/categories");

    console.log("Admin - Posts fetched:", postsData?.length);
    console.log("Admin - Categories fetched:", categoriesData?.length);

    // Map categories to posts
    const postsWithCategories: BlogPostWithCategory[] = postsData.map((post: any) => {
      const postCategories = (post.category_ids || []).map((id: string, idx: number) => ({
        id,
        name: post.category_names?.[idx] || "",
        slug: "",
        created_at: ""
      }));
      return {
        ...post,
        categories: postCategories
      };
    });

    return {
      posts: postsWithCategories,
      categories: categoriesData
    };
  } catch (err: any) {
    console.error("Error fetching blog data:", err);
    toast({
      title: "Error",
      description: "Failed to load blog data. Please try again.",
      variant: "destructive"
    });
    throw err;
  }
};

export const fetchBlogCategories = async (): Promise<BlogCategory[]> => {
  try {
    const categoriesData = await apiClient.get("/blog/categories");
    return categoriesData;
  } catch (err: any) {
    throw err;
  }
};
