
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import BlogSidebar from "@/components/BlogSidebar";
import BlogNewsletter from "@/components/BlogNewsletter";
import BlogFooter from "@/components/BlogFooter";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost, BlogCategory } from "@/types/blog";
import { format } from "date-fns";

const BlogCategoriesPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchCategoryAndPosts = async () => {
      try {
        setIsLoading(true);
        
        if (!slug) {
          setError("Category not specified");
          setIsLoading(false);
          return;
        }
        
        // First get the category
        const { data: categoryData, error: categoryError } = await supabase
          .from("blog_categories")
          .select("*")
          .eq("slug", slug)
          .single();
        
        if (categoryError) throw categoryError;
        
        setCategory(categoryData);
        
        // Then get post IDs that belong to this category
        const { data: postCategoriesData, error: postCategoriesError } = await supabase
          .from("blog_post_categories")
          .select("post_id")
          .eq("category_id", categoryData.id);
        
        if (postCategoriesError) throw postCategoriesError;
        
        if (postCategoriesData.length === 0) {
          setPosts([]);
          setIsLoading(false);
          return;
        }
        
        // Get the actual posts
        const postIds = postCategoriesData.map(pc => pc.post_id);
        
        const { data: postsData, error: postsError } = await supabase
          .from("blog_posts")
          .select("*")
          .in("id", postIds)
          .eq("published", true)
          .order("published_at", { ascending: false });
        
        if (postsError) throw postsError;
        
        setPosts(postsData);
        
      } catch (err: any) {
        console.error("Error fetching category data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCategoryAndPosts();
  }, [slug]);
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };
  
  return (
    <div className="font-sans bg-white text-[#333] dark:bg-gray-950 dark:text-gray-200">
      <PageHeader />
      <main className="pt-[140px]">
        <div className="container max-w-[1200px] mx-auto px-5 py-8">
          {isLoading ? (
            <div className="h-10 w-64 bg-gray-200 animate-pulse rounded"></div>
          ) : error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : category ? (
            <>
              <h1 className="text-3xl font-bold mb-4">Category: {category.name}</h1>
              <p className="mb-8 text-gray-600 dark:text-gray-400">
                Browsing all posts in the {category.name} category.
              </p>
            </>
          ) : (
            <div className="text-red-500">Category not found</div>
          )}
        </div>
        
        <div className="container max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 py-8">
          <div>
            {isLoading ? (
              <div className="space-y-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                ))}
              </div>
            ) : posts.length > 0 ? (
              <div className="space-y-8">
                {posts.map((post) => (
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                    <h2 className="text-xl font-bold mb-2 text-[#1A237E] dark:text-[#00B8D4]">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      Posted on {formatDate(post.published_at)}
                    </p>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {post.excerpt}
                    </p>
                    <Link 
                      to={`/blog/${post.slug}`} 
                      className="text-[#1A237E] dark:text-[#00B8D4] font-medium hover:underline"
                    >
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <h2 className="text-xl font-medium text-gray-600 dark:text-gray-400">
                  No posts found in this category.
                </h2>
              </div>
            )}
          </div>
          
          <BlogSidebar />
        </div>
        
        <BlogNewsletter />
        <BlogFooter />
      </main>
    </div>
  );
};

export default BlogCategoriesPage;
