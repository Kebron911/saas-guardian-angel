import React from "react";

const BlogSidebar = () => (
  <aside className="sidebar mt-16 md:mt-0">
    {/* Search Widget */}
    <div className="sidebar-widget bg-[#F5F5F5] rounded-lg p-6 mb-7">
      <h3 className="font-bold text-lg text-[#1A237E] mb-5">Search</h3>
      <form className="search-form flex">
        <input type="text" className="search-input flex-1 border border-gray-300 rounded-l px-4 py-2 text-base" placeholder="Search articles..." />
        <button type="submit" className="search-button bg-[#1A237E] text-white px-5 rounded-r">🔍</button>
      </form>
    </div>
    {/* Categories Widget */}
    <div className="sidebar-widget bg-[#F5F5F5] rounded-lg p-6 mb-7">
      <h3 className="font-bold text-lg text-[#1A237E] mb-5">Categories</h3>
      <ul className="categories-list">
        <li className="py-2 border-b border-gray-200 flex justify-between">
          <a href="#" className="text-[#555] hover:text-[#00B8D4] flex-1">Case Studies</a>
          <span className="count bg-[#00B8D4] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2">12</span>
        </li>
        <li className="py-2 border-b border-gray-200 flex justify-between">
          <a href="#" className="text-[#555] hover:text-[#00B8D4] flex-1">Strategy</a>
          <span className="count bg-[#00B8D4] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2">8</span>
        </li>
        <li className="py-2 border-b border-gray-200 flex justify-between">
          <a href="#" className="text-[#555] hover:text-[#00B8D4] flex-1">Trends</a>
          <span className="count bg-[#00B8D4] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2">5</span>
        </li>
        <li className="py-2 border-b border-gray-200 flex justify-between">
          <a href="#" className="text-[#555] hover:text-[#00B8D4] flex-1">Productivity</a>
          <span className="count bg-[#00B8D4] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2">3</span>
        </li>
        <li className="py-2 border-b border-gray-200 flex justify-between">
          <a href="#" className="text-[#555] hover:text-[#00B8D4] flex-1">Customer Service</a>
          <span className="count bg-[#00B8D4] text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center ml-2">15</span>
        </li>
      </ul>
    </div>
    {/* Popular Posts Widget */}
    <div className="sidebar-widget bg-[#F5F5F5] rounded-lg p-6 mb-7">
      <h3 className="font-bold text-lg text-[#1A237E] mb-5">Popular Posts</h3>
      <ul className="popular-posts">
        <li className="popular-post-item flex items-center py-3 border-b border-gray-200">
          <div className="popular-post-image w-[60px] h-[60px] rounded bg-gray-200 flex-shrink-0 mr-4">
            <img src="/api/placeholder/60/60" alt="Popular Post" className="rounded"/>
          </div>
          <div>
            <h4 className="font-bold text-base"><a href="#" className="hover:text-[#00B8D4]">AI Assistants vs. Outsourcing: Which is Right for You?</a></h4>
            <span className="popular-post-date text-xs text-[#777]">March 15, 2025</span>
          </div>
        </li>
        <li className="popular-post-item flex items-center py-3 border-b border-gray-200">
          <div className="popular-post-image w-[60px] h-[60px] rounded bg-gray-200 flex-shrink-0 mr-4">
            <img src="/api/placeholder/60/60" alt="Popular Post" className="rounded"/>
          </div>
          <div>
            <h4 className="font-bold text-base"><a href="#" className="hover:text-[#00B8D4]">The Future of Work: How AI is Reshaping the Modern Workplace</a></h4>
            <span className="popular-post-date text-xs text-[#777]">February 28, 2025</span>
          </div>
        </li>
        <li className="popular-post-item flex items-center py-3 border-b border-gray-200">
          <div className="popular-post-image w-[60px] h-[60px] rounded bg-gray-200 flex-shrink-0 mr-4">
            <img src="/api/placeholder/60/60" alt="Popular Post" className="rounded"/>
          </div>
          <div>
            <h4 className="font-bold text-base"><a href="#" className="hover:text-[#00B8D4]">Top 10 AI Assistant Tools for Boosting Productivity in 2025</a></h4>
            <span className="popular-post-date text-xs text-[#777]">January 22, 2025</span>
          </div>
        </li>
      </ul>
    </div>
    {/* Tags Widget */}
    <div className="sidebar-widget bg-[#F5F5F5] rounded-lg p-6">
      <h3 className="font-bold text-lg text-[#1A237E] mb-5">Tags</h3>
      <div className="tag-cloud flex flex-wrap gap-3">
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">AI Staff</a>
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">Automation</a>
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">Productivity</a>
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">Customer Service</a>
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">Efficiency</a>
        <a href="#" className="tag bg-white text-[#555] px-4 py-1 rounded hover:bg-[#00B8D4] hover:text-white">Trends</a>
      </div>
    </div>
  </aside>
);

export default BlogSidebar;
