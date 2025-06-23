
import React from "react";
import { Link } from "react-router-dom";
import { useBlogPageData } from "@/hooks/useBlogPageData";
import { BlogPostWithCategory } from "@/types/blog";

const BlogCategoriesList = () => {
  const { categories, posts, isLoading } = useBlogPageData();
  
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="animate-pulse space-y-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // Count posts in each category
  const categoriesWithCount = categories.map((category) => {
    const count = (posts as BlogPostWithCategory[]).filter(post => 
      post.categories?.some(cat => cat.id === category.id)
    ).length;
    
    return {
      ...category,
      count
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      {categoriesWithCount.length > 0 ? (
        <ul className="space-y-2">
          {categoriesWithCount.map((category) => (
            <li key={category.id} className="flex items-center justify-between">
              <Link 
                to={`/blog/category/${category.slug}`} 
                className="text-gray-700 dark:text-gray-300 hover:text-[#9b87f5] dark:hover:text-[#00B8D4]"
              >
                {category.name}
              </Link>
              <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full">
                {category.count}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
      )}
    </div>
  );
};

export default BlogCategoriesList;
