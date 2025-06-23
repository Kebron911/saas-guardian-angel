
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiClient } from "@/lib/api-client";

export interface PostgresBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  date: string;
  views: number;
  comments: number;
}

export const usePostgresBlogData = () => {
  const [publishedPosts, setPublishedPosts] = useState<PostgresBlogPost[]>([]);
  const [draftPosts, setDraftPosts] = useState<PostgresBlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      console.log("Fetching blog data from PostgreSQL...");
      
      const [publishedData, draftData] = await Promise.all([
        apiClient.get("/blog/posts/published"),
        apiClient.get("/blog/posts/drafts")
      ]);

      console.log("Published posts fetched:", publishedData.length);
      console.log("Draft posts fetched:", draftData.length);

      setPublishedPosts(publishedData);
      setDraftPosts(draftData);
      
    } catch (err: any) {
      console.error("Error fetching blog data:", err);
      setError(err.message);
      toast({
        title: "Error",
        description: "Failed to load blog data from database",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await apiClient.delete(`/blog/posts/${id}`);
      await fetchPosts(); // Refresh data
      
      toast({
        title: "Success",
        description: "Blog post deleted successfully.",
      });
      
      return true;
    } catch (err: any) {
      console.error("Error deleting post:", err);
      toast({
        title: "Error",
        description: "Failed to delete blog post",
        variant: "destructive"
      });
      throw err;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return {
    publishedPosts,
    draftPosts,
    isLoading,
    error,
    fetchPosts,
    deletePost
  };
};
