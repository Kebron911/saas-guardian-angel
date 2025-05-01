
import React from "react";
import { Link } from "react-router-dom";
import BlogCategoriesList from "./BlogCategoriesList";

const BlogSidebar = () => {
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
          {/* This is a simplified example - in a real application you'd fetch recent posts */}
          <Link to="/blog/sample-post-1" className="block hover:text-[#9b87f5]">
            How AI is Transforming Customer Service
          </Link>
          <Link to="/blog/sample-post-2" className="block hover:text-[#9b87f5]">
            5 Ways to Improve Your Business Communication
          </Link>
          <Link to="/blog/sample-post-3" className="block hover:text-[#9b87f5]">
            The Benefits of an AI Receptionist
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default BlogSidebar;
