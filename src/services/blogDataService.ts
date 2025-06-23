
import { supabase } from "@/integrations/supabase/client";
import { BlogPostWithCategory, BlogCategory } from "@/types/blog";
import { toast } from "@/hooks/use-toast";

export const fetchBlogData = async () => {
  try {
    console.log("Admin - Fetching blog data...");
    
    // Fetch all posts
    const { data: postsData, error: postsError } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (postsError) {
      console.error("Error fetching posts:", postsError);
      throw postsError;
    }

    // Fetch all categories
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      throw categoriesError;
    }
    
    // Fetch post-category relationships
    const { data: postCategoriesData, error: postCategoriesError } = await supabase
      .from("blog_post_categories")
      .select("post_id, category_id");

    if (postCategoriesError) {
      console.error("Error fetching post-category relationships:", postCategoriesError);
      throw postCategoriesError;
    }

    console.log("Admin - Posts fetched:", postsData?.length);
    console.log("Admin - Categories fetched:", categoriesData?.length);
    console.log("Admin - Post-category relationships:", postCategoriesData?.length);

    // Map categories to posts
    const postsWithCategories: BlogPostWithCategory[] = postsData.map((post: any) => {
      const postCategoryIds = postCategoriesData
        .filter((pc: any) => pc.post_id === post.id)
        .map((pc: any) => pc.category_id);
      
      const postCategories = categoriesData.filter((cat: any) => 
        postCategoryIds.includes(cat.id)
      );
      
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
    const { data: categoriesData, error: categoriesError } = await supabase
      .from("blog_categories")
      .select("*")
      .order("name", { ascending: true });

    if (categoriesError) {
      console.error("Error fetching categories:", categoriesError);
      throw categoriesError;
    }

    return categoriesData;
  } catch (err: any) {
    console.error("Error fetching categories:", err);
    throw err;
  }
};
