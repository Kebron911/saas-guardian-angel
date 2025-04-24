import React from "react";
import { Link } from "react-router-dom";

const BlogPosts = () => (
  <main>
    {/* Featured Post */}
    <div className="featured-post mb-12">
      <Link to="/blog/smith-associates-case-study" className="featured-post-card bg-white rounded-lg shadow-md overflow-hidden block hover:shadow-lg transition-shadow">
        <div className="featured-image h-[250px] md:h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
          <img src="/api/placeholder/800/400" alt="Featured Post" className="object-cover w-full h-full" />
        </div>
        <div className="featured-content p-8">
          <div className="post-meta flex items-center mb-4 text-[#777] text-sm">
            <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-4">Case Study</span>
            <span>April 12, 2025</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">How Smith & Associates Increased Customer Response Time by 400% with AI Assistants</h2>
          <p className="mb-2 text-[#555]">When Smith & Associates implemented our AI Phone Receptionist and Customer Support AI, they faced significant backlogs in customer inquiries. Within just three weeks, their response time dropped from 24 hours to under 6 hours, leading to a measurable increase in customer satisfaction scores and retention rates.</p>
          <p className="mb-5 text-[#555]">This comprehensive case study explores the implementation process, challenges faced, and the measurable ROI achieved through strategic AI deployment.</p>
          <a href="#" className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
            Read the full case study
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </Link>
    </div>
    {/* Blog Posts Grid */}
    <div className="blog-posts grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Card 1 */}
      <Link to="/blog/integrate-ai-assistants" className="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div className="blog-image h-[200px] bg-gray-100 flex items-center justify-center">
          <img src="/api/placeholder/400/200" alt="Blog Post" className="object-cover w-full h-full"/>
        </div>
        <div className="blog-content p-6">
          <div className="post-meta flex items-center mb-3 text-[#777] text-sm">
            <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-3">Strategy</span>
            <span>April 8, 2025</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-2">5 Ways to Integrate AI Assistants with Your Existing Team</h3>
          <p className="mb-4 text-[#555]">Learn how to create a harmonious working relationship between your human staff and AI assistants to maximize productivity and job satisfaction.</p>
          <a href="#" className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </Link>
      {/* Card 2 ... etc ... */}
      {/* More cards as in HTML */}
      <div className="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div className="blog-image h-[200px] bg-gray-100 flex items-center justify-center">
          <img src="/api/placeholder/400/200" alt="Blog Post" className="object-cover w-full h-full" />
        </div>
        <div className="blog-content p-6">
          <div className="post-meta flex items-center mb-3 text-[#777] text-sm">
            <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-3">Tips & Tricks</span>
            <span>March 28, 2025</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-2">Maximizing Efficiency: Top 10 Prompts for AI Customer Service</h3>
          <p className="mb-4 text-[#555]">Unlock the full potential of your AI customer service assistant with these proven prompt strategies that drive engagement and resolve issues faster.</p>
          <a href="#" className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div className="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div className="blog-image h-[200px] bg-gray-100 flex items-center justify-center">
          <img src="/api/placeholder/400/200" alt="Blog Post" className="object-cover w-full h-full" />
        </div>
        <div className="blog-content p-6">
          <div className="post-meta flex items-center mb-3 text-[#777] text-sm">
            <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-3">News</span>
            <span>March 22, 2025</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-2">Announcing Our New Integration with Slack for Real-Time AI Assistance</h3>
          <p className="mb-4 text-[#555]">We're excited to announce our latest integration with Slack, enabling seamless access to AI assistants directly within your team's communication channels.</p>
          <a href="#" className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
      <div className="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1">
        <div className="blog-image h-[200px] bg-gray-100 flex items-center justify-center">
          <img src="/api/placeholder/400/200" alt="Blog Post" className="object-cover w-full h-full" />
        </div>
        <div className="blog-content p-6">
          <div className="post-meta flex items-center mb-3 text-[#777] text-sm">
            <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-3">Product Updates</span>
            <span>March 18, 2025</span>
          </div>
          <h3 className="text-xl font-bold text-[#1A237E] mb-2">New Feature: AI-Powered Sentiment Analysis for Enhanced Customer Interactions</h3>
          <p className="mb-4 text-[#555]">Our latest feature uses advanced sentiment analysis to help your AI assistants understand and respond to customer emotions more effectively.</p>
          <a href="#" className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
            Read more
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
        </div>
      </div>
    </div>
    {/* Pagination */}
    <div className="pagination flex mt-12 justify-center gap-2 text-sm">
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-[#1A237E] text-white font-bold rounded">1</span>
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-white text-[#555] rounded">2</span>
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-white text-[#555] rounded">3</span>
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-white text-[#555] rounded">...</span>
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-white text-[#555] rounded">8</span>
      <span className="pagination-link w-10 h-10 flex items-center justify-center cursor-pointer bg-white text-[#555] rounded">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
      </span>
    </div>
  </main>
);

export default BlogPosts;
