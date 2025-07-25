import React from "react";
import { Link } from "react-router-dom";
import BlogCategoriesList from "./BlogCategoriesList";
import { useBlogPageData } from "@/hooks/useBlogPageData";

const BlogSidebar = () => {
  const { posts, isLoading } = useBlogPageData();

  // Sort posts by published_at descending
  const recentPosts = [...posts]
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
    .slice(0, 5);

  return (
    <aside className="space-y-8">
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">About Our Blog</h3>
        <p className="text-gray-600">
          Welcome to our blog where we share insights about AI receptionists, 
          customer service automation, and tips for small business growth.
        </p>
      </div>
      
      <BlogCategoriesList />
      
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {isLoading ? (
            <div className="animate-pulse space-y-2">
              {[1,2,3].map(i => (
                <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
              ))}
            </div>
          ) : recentPosts.length > 0 ? (
            recentPosts.map(post => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="block hover:text-[#9b87f5]"
              >
                {post.title}
              </Link>
            ))
          ) : (
            <div className="text-gray-500 dark:text-gray-400">No recent posts.</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
