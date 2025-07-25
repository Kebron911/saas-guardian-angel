import React, { useEffect } from "react";
import { MessageSquare, Share, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useSingleBlogPost } from "@/hooks/useBlogPageData";
import { format } from "date-fns";
import { BlogPostWithCategory } from "@/types/blog";
import BlogComments from "@/components/BlogComments";

interface BlogPostContentProps {
  slug?: string;
}

const BlogPostContent = ({ slug }: BlogPostContentProps) => {
  const { post, isLoading, error } = useSingleBlogPost(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  if (isLoading) {
    return <div className="py-20 text-center">Loading post content...</div>;
  }

  if (error || !post) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
        <p className="text-gray-600 mb-6">The blog post you're looking for couldn't be found.</p>
        <Link to="/blog" className="text-[#00B8D4] font-semibold">
          Return to Blog
        </Link>
      </div>
    );
  }

  // Cast the post to BlogPostWithCategory to access the categories property
  const typedPost = post as BlogPostWithCategory;

  return (
    <article className="blog-post">
      <div className="post-meta flex items-center mb-4 text-[#777] text-sm">
        {typedPost.categories && typedPost.categories.length > 0 && (
          <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-4">
            {typedPost.categories[0].name}
          </span>
        )}
        <span>{formatDate(post.published_at)}</span>
      </div>
      
      <h1 className="text-3xl md:text-4xl font-bold text-[#1A237E] mb-6">
        {post.title}
      </h1>

      <div className="featured-image mb-8 rounded-lg overflow-hidden">
        {post.featured_image ? (
          <img 
            src={post.featured_image} 
            alt={post.title} 
            className="w-full h-[400px] object-cover" 
          />
        ) : (
          <img 
            src="/api/placeholder/800/400" 
            alt={post.title} 
            className="w-full h-[400px] object-cover" 
          />
        )}
      </div>

      <div className="post-content prose max-w-none">
        {/* Render the content as dangerously set HTML or as plain text */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>

      <div className="post-navigation my-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <Link 
            to="/blog"
            className="flex items-center gap-2 text-[#1A237E] hover:text-[#00B8D4] transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <div className="flex flex-col">
              <span className="text-sm text-[#777]">Back to</span>
              <span className="font-semibold">All Articles</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="post-footer mt-12 pt-8 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
              <Heart className="w-5 h-5" />
              <span>{post.views || 0} Views</span>
            </div>
            <div className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
              <MessageSquare className="w-5 h-5" />
              <span>{post.comments || 0} Comments</span>
            </div>
          </div>
          <button className="flex items-center gap-2 text-[#777] hover:text-[#00B8D4]">
            <Share className="w-5 h-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Blog Comments Section */}
      <BlogComments postId={post.id} />
    </article>
  );
};

export default BlogPostContent;
