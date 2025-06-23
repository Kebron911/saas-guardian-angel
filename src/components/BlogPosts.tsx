
import React from "react";
import { Link } from "react-router-dom";
import { useBlogPageData } from "@/hooks/useBlogPageData";
import { format } from "date-fns";
import { BlogPostWithCategory } from "@/types/blog";
import { RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const BlogPosts = () => {
  const { posts, isLoading, error } = useBlogPageData();
  const [refreshing, setRefreshing] = React.useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    window.location.reload();
  };
   // Add at the top of your component, after other hooks:
      const POSTS_PER_PAGE = 6; // Change this number as needed
      const [currentPage, setCurrentPage] = React.useState(1);
      const blogGridRef = React.useRef<HTMLDivElement>(null);

       // First post is featured
      const featuredPost = posts[0] as BlogPostWithCategory;
      const regularPosts = posts.slice(1) as BlogPostWithCategory[];

      const totalPages = Math.ceil(regularPosts.length / POSTS_PER_PAGE);
      const paginatedPosts = regularPosts.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
      );

      const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Scroll to the blog posts grid
        setTimeout(() => {
          blogGridRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 0);
      };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-gray-800 dark:border-white mb-4"></div>
        <div className="text-lg">Loading blog posts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center">
        <div className="text-red-500 mb-4">Error loading blog posts: {error}</div>
        <Button onClick={handleRefresh} disabled={refreshing}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          {refreshing ? "Refreshing..." : "Refresh Page"}
        </Button>
      </div>
    );
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return format(new Date(dateString), "MMMM d, yyyy");
  };

  // If no posts, show a message
  if (!posts || posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-medium text-gray-600 mb-4">No blog posts found.</h2>
        <p className="text-gray-500 mb-6">
          Visit the <Link to="/admin/blog" className="text-blue-600 hover:underline">admin area</Link> to create blog posts.
        </p>
        <div className="mt-8">
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            {refreshing ? "Refreshing..." : "Refresh Page"}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            If you just created sample content, try refreshing the page to see it.
          </p>
        </div>
      </div>
    );
  }

  console.log("Rendering blog posts:", posts.length);
  
 

  return (
    <main>
      {/* Featured Post */}
      {featuredPost && (
        <div className="featured-post mb-12">
          <Link to={`/blog/${featuredPost.slug}`} className="featured-post-card bg-white rounded-lg shadow-md overflow-hidden block hover:shadow-lg transition-shadow">
            <div className="featured-image h-[250px] md:h-[400px] bg-gray-100 flex items-center justify-center overflow-hidden">
              {featuredPost.featured_image ? (
                <img 
                  src={featuredPost.featured_image} 
                  alt={featuredPost.title} 
                  className="object-cover w-full h-full" 
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            <div className="featured-content p-8">
              <div className="post-meta flex items-center mb-4 text-[#777] text-sm">
                {featuredPost.categories && featuredPost.categories.length > 0 && (
                  <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-4">
                    {featuredPost.categories[0].name}
                  </span>
                )}
                <span>{formatDate(featuredPost.published_at)}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1A237E] mb-3">{featuredPost.title}</h2>
              <p className="mb-5 text-[#555]">{featuredPost.excerpt}</p>
              <span className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
                Read the full article
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </span>
            </div>
          </Link>
        </div>
      )}

     

      {/* Blog Posts Grid */}
      {regularPosts.length > 0 ? (
  <>
    <div className="blog-posts grid grid-cols-1 md:grid-cols-3 gap-8">
      {paginatedPosts.map(post => (
        <Link 
          key={post.id}
          to={`/blog/${post.slug}`} 
          className="blog-card bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:-translate-y-1"
        >
          {/* ...existing card code... */}
          <div className="blog-image h-[200px] bg-gray-100 flex items-center justify-center">
            {post.featured_image ? (
              <img 
                src={post.featured_image} 
                alt={post.title} 
                className="object-cover w-full h-full" 
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No image available</span>
              </div>
            )}
          </div>
          <div className="blog-content p-6">
            <div className="post-meta flex items-center mb-3 text-[#777] text-sm">
              {post.categories && post.categories.length > 0 && (
                <span className="category bg-[#FFF9C4] text-[#1A237E] font-semibold px-3 py-1 rounded mr-3">
                  {post.categories[0].name}
                </span>
              )}
              <span>{formatDate(post.published_at)}</span>
            </div>
            <h3 className="text-xl font-bold text-[#1A237E] mb-2">{post.title}</h3>
            <p className="mb-4 text-[#555]">{post.excerpt}</p>
            <span className="read-more text-[#00B8D4] font-semibold inline-flex items-center">
              Read more
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="ml-2"><path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#00B8D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
    {/* Pagination Controls */}
    {totalPages > 1 && (
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            className={`px-4 py-2 rounded mb-4 ${
              currentPage === i + 1
                ? "bg-[#1A237E] text-white"
                : "bg-gray-200 text-[#1A237E] hover:bg-[#00B8D4] hover:text-white "
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    )}
  </>
) : null}
    </main>
  );
};

export default BlogPosts;
