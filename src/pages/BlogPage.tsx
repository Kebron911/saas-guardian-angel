
import React, { useEffect } from "react";
import PageHeader from "@/components/PageHeader";
import BlogHeader from "@/components/BlogHeader";
import BlogPosts from "@/components/BlogPosts";
import BlogSidebar from "@/components/BlogSidebar";
import BlogNewsletter from "@/components/BlogNewsletter";
import BlogFooter from "@/components/BlogFooter";
import { Link } from "react-router-dom";

const BlogPage = () => {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="font-sans bg-white text-[#333]">
      <PageHeader />
      <main className="pt-[140px]">
        <BlogHeader />
        <div className="container max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 py-16">
          <BlogPosts />
          <aside>
            <BlogSidebar />
            {/* Admin link for quick access */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg dark:bg-blue-900/30">
              <h3 className="text-lg font-semibold mb-2">Admin Access</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Manage your blog content through the admin panel.
              </p>
              <Link 
                to="/admin/blog" 
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Go to Blog Admin →
              </Link>
            </div>
          </aside>
        </div>
        <BlogNewsletter />
        <BlogFooter />
      </main>
    </div>
  );
};

export default BlogPage;
