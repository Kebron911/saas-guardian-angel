import React from "react";
import { MessageSquare, Share, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface BlogPostContentProps {
  slug?: string;
}

const BlogPostContent = ({ slug }: BlogPostContentProps) => (
  <article className="blog-post">
    <div className="post-meta flex items-center mb-4 text-[#777] text-sm">
      <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-4">Case Study</span>
      <span>April 12, 2025</span>
      {slug && <span className="ml-4 text-[#00B8D4]">Post ID: {slug}</span>}
    </div>
    
    <h1 className="text-3xl md:text-4xl font-bold text-[#1A237E] mb-6">
      How Smith & Associates Increased Customer Response Time by 400% with AI Assistants
    </h1>

    <div className="author-info flex items-center mb-8">
      <img src="/api/placeholder/40/40" alt="Author" className="w-10 h-10 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold text-[#1A237E]">Sarah Johnson</h3>
        <span className="text-sm text-[#777]">AI Implementation Specialist</span>
      </div>
    </div>

    <div className="featured-image mb-8 rounded-lg overflow-hidden">
      <img src="/api/placeholder/800/400" alt="Featured Post" className="w-full h-[400px] object-cover" />
    </div>

    <div className="post-content prose max-w-none">
      <p className="text-lg leading-relaxed mb-6 text-[#555]">
        When Smith & Associates implemented our AI Phone Receptionist and Customer Support AI, they faced significant backlogs in customer inquiries. Within just three weeks, their response time dropped from 24 hours to under 6 hours, leading to a measurable increase in customer satisfaction scores and retention rates.
      </p>

      <h2 className="text-2xl font-bold text-[#1A237E] mt-8 mb-4">The Challenge</h2>
      <p className="text-lg leading-relaxed mb-6 text-[#555]">
        Prior to implementing AI assistants, Smith & Associates struggled with:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[#555]">
        <li className="mb-2">24+ hour response times to customer inquiries</li>
        <li className="mb-2">Overwhelmed customer service staff</li>
        <li className="mb-2">Inconsistent service quality</li>
        <li>High customer churn rate</li>
      </ul>

      <h2 className="text-2xl font-bold text-[#1A237E] mt-8 mb-4">The Solution</h2>
      <p className="text-lg leading-relaxed mb-6 text-[#555]">
        Implementation of our AI Phone Receptionist brought immediate improvements:
      </p>
      <ul className="list-disc pl-6 mb-6 text-[#555]">
        <li className="mb-2">24/7 availability for customer inquiries</li>
        <li className="mb-2">Automated routing of calls and messages</li>
        <li className="mb-2">Consistent response quality</li>
        <li>Real-time data analytics and reporting</li>
      </ul>
    </div>

    <div className="post-navigation my-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <Link 
          to="/blog/integrate-ai-assistants" 
          className="flex items-center gap-2 text-[#1A237E] hover:text-[#00B8D4] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
          <div className="flex flex-col">
            <span className="text-sm text-[#777]">Previous Article</span>
            <span className="font-semibold">5 Ways to Integrate AI Assistants</span>
          </div>
        </Link>
        <Link 
          to="/blog/new-integration" 
          className="flex items-center gap-2 text-[#1A237E] hover:text-[#00B8D4] transition-colors"
        >
          <div className="flex flex-col items-end">
            <span className="text-sm text-[#777]">Next Article</span>
            <span className="font-semibold">New Slack Integration</span>
          </div>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    </div>

    <div className="post-footer mt-12 pt-8 border-t border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex gap-6">
          <button className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
            <Heart className="w-5 h-5" />
            <span>42 Likes</span>
          </button>
          <button className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
            <MessageSquare className="w-5 h-5" />
            <span>12 Comments</span>
          </button>
        </div>
        <button className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
          <Share className="w-5 h-5" />
          <span>Share</span>
        </button>
      </div>
    </div>

    <div className="related-posts mt-12 pt-8 border-t border-gray-200">
      <h3 className="text-xl font-bold text-[#1A237E] mb-6">Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link to="/blog/maximizing-efficiency" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:-translate-y-1">
            <div className="h-[200px] bg-gray-100">
              <img src="/api/placeholder/400/200" alt="Related Post" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="font-bold text-[#1A237E] mb-2 group-hover:text-[#00B8D4]">
                Maximizing Efficiency: Top 10 Prompts for AI Customer Service
              </h4>
              <p className="text-[#555] text-sm">March 28, 2025</p>
            </div>
          </div>
        </Link>
        <Link to="/blog/new-integration" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform group-hover:-translate-y-1">
            <div className="h-[200px] bg-gray-100">
              <img src="/api/placeholder/400/200" alt="Related Post" className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h4 className="font-bold text-[#1A237E] mb-2 group-hover:text-[#00B8D4]">
                Announcing Our New Integration with Slack for Real-Time AI Assistance
              </h4>
              <p className="text-[#555] text-sm">March 22, 2025</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  </article>
);

export default BlogPostContent;
