import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import BlogSidebar from "@/components/BlogSidebar";
import BlogNewsletter from "@/components/BlogNewsletter";
import BlogFooter from "@/components/BlogFooter";
import { apiClient } from "@/lib/api-client";
import { BlogPostWithCategory, BlogCategory } from "@/types/blog";
import { format } from "date-fns";

// Helper to handle Google Drive and other image URLs
function getDisplayImageUrl(url: string) {
  if (!url) return "/placeholder.svg";
  if (url.includes("drive.google.com")) {
    const fileIdMatch = url.match(/\/d\/([\w-]+)/) || url.match(/[?&]id=([\w-]+)/);
    if (fileIdMatch && fileIdMatch[1]) {
      return `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`;
    }
  }
  return url;
}

const BlogCategoriesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  const [posts, setPosts] = useState<BlogPostWithCategory[]>([]);
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
        // Fetch category by slug, or handle 'uncategorized'
        const categories = await apiClient.get("/blog/categories");
        let foundCategory: BlogCategory | null = null;
        if (slug === "uncategorized") {
          foundCategory = { id: "uncategorized", name: "Uncategorized", slug: "uncategorized", created_at: "" };
        } else {
          foundCategory = categories.find((cat: BlogCategory) => cat.slug === slug) || null;
        }
        if (!foundCategory) {
          setError("Category not found");
          setIsLoading(false);
          return;
        }
        setCategory(foundCategory);
        // Fetch all published posts
        const postsData = await apiClient.get("/blog/posts/published");
        let filteredPosts;
        if (slug === "uncategorized") {
          // Show posts with no categories
          filteredPosts = postsData.filter((post: any) => {
            const ids = post.category_ids || [];
            return !ids || ids.length === 0 || ids.every((id: string) => !id);
          });
        } else {
          // Filter posts that include this category
          filteredPosts = postsData.filter((post: any) =>
            (post.category_ids || []).includes(foundCategory.id)
          );
        }
        filteredPosts = filteredPosts.map((post: any) => {
          let categoryIds = post.category_ids;
          // Normalize categoryIds to always be an array of strings
          if (typeof categoryIds === "string" && categoryIds.startsWith("{")) {
            categoryIds = categoryIds.slice(1, -1).split(",").map((id: string) => id.trim()).filter(Boolean);
          } else if (!Array.isArray(categoryIds)) {
            categoryIds = [];
          }
          // Ensure all IDs are strings
          categoryIds = categoryIds.map((id: any) => String(id));
          post.category_ids = categoryIds;
          // Map categories with id, name, slug, created_at (slug/created_at may be empty if not available)
          const categories = (categoryIds || []).map((id: string, idx: number) => ({
            id,
            name: post.category_names?.[idx] || "",
            slug: post.category_slugs?.[idx] || "",
            created_at: post.category_created_ats?.[idx] || ""
          }));
          // Ensure excerpt is present, fallback to first 150 chars of content if missing
          let excerpt = post.excerpt;
          if (!excerpt && post.content) {
            // Remove markdown/html tags if needed
            const plain = post.content.replace(/<[^>]+>/g, '').replace(/[#*_`~\[\]]/g, '');
            excerpt = plain.slice(0, 150) + (plain.length > 150 ? '...' : '');
          }
          return {
            ...post,
            categories,
            excerpt
          };
        });
        setPosts(filteredPosts);
      } catch (err: any) {
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
                  <div key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex flex-col md:flex-row gap-6">
                    {post.featured_image && (
                      <div className="flex-shrink-0 w-full md:w-48 h-40 md:h-32 mb-4 md:mb-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                        <img
                          src={getDisplayImageUrl(post.featured_image)}
                          alt={post.title + " featured image"}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/placeholder.svg";
                          }}
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-2 text-[#1A237E] dark:text-[#00B8D4]">
                        {post.title}
                      </h2>
                      <div className="flex items-center gap-6 mb-2">
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                          {post.views || 0} Views
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z"/></svg>
                          {post.comments || 0} Comments
                        </span>
                      </div>
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
