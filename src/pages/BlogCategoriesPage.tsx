
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import PageHeader from "@/components/PageHeader";
import BlogSidebar from "@/components/BlogSidebar";
import BlogNewsletter from "@/components/BlogNewsletter";
import BlogFooter from "@/components/BlogFooter";

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  published_at: string;
}

const BlogCategoriesPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<BlogCategory | null>(null);
  
  const { data: postsData, isLoading: postsLoading } = useQuery({
    queryKey: ['categoryPosts', slug],
    queryFn: async () => {
      // First get the category
      const { data: categoryData } = await supabase
        .from('blog_categories')
        .select('*')
        .eq('slug', slug)
        .single();
        
      if (!categoryData) throw new Error("Category not found");
      setCategory(categoryData);
      
      // Then get posts for this category
      const { data: postsInCategory } = await supabase
        .from('blog_post_categories')
        .select('post_id')
        .eq('category_id', categoryData.id);
        
      if (!postsInCategory || postsInCategory.length === 0) {
        return [];
      }
      
      const postIds = postsInCategory.map(item => item.post_id);
      
      const { data: posts } = await supabase
        .from('blog_posts')
        .select('*')
        .in('id', postIds)
        .eq('published', true)
        .order('published_at', { ascending: false });
        
      return posts || [];
    },
    enabled: !!slug,
  });
  
  return (
    <div className="font-sans bg-white text-[#333]">
      <PageHeader />
      <main className="pt-[140px]">
        <div className="container max-w-[1200px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-12 py-16">
          <div>
            {postsLoading ? (
              <div className="animate-pulse">
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-6"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-6"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="mb-8">
                    <div className="h-40 bg-gray-200 rounded mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">
                  {category ? `Category: ${category.name}` : 'Category'}
                </h1>
                
                {postsData && postsData.length > 0 ? (
                  <div className="space-y-12">
                    {postsData.map((post: BlogPost) => (
                      <div key={post.id} className="border-b border-gray-200 pb-8">
                        {post.featured_image && (
                          <Link to={`/blog/${post.slug}`} className="block mb-4">
                            <img 
                              src={post.featured_image} 
                              alt={post.title}
                              className="w-full h-[240px] object-cover rounded-lg"
                            />
                          </Link>
                        )}
                        <h2 className="text-2xl font-bold mb-2">
                          <Link to={`/blog/${post.slug}`} className="hover:text-[#9b87f5]">
                            {post.title}
                          </Link>
                        </h2>
                        <div className="text-gray-600 mb-3">
                          {new Date(post.published_at).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                        <p className="text-gray-700">
                          {post.excerpt || ''}
                        </p>
                        <div className="mt-4">
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="text-[#9b87f5] hover:text-[#7E69AB] font-medium"
                          >
                            Read more →
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600">
                      No posts found in this category.
                    </h3>
                  </div>
                )}
              </>
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
