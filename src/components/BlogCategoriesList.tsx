
import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const BlogCategoriesList = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ["blogCategories"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_categories")
        .select("*")
        .order("name");
        
      if (error) throw error;
      return data || [];
    },
  });
  
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-gray-200 rounded w-full"></div>
        ))}
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="space-y-2">
        {categories && categories.length > 0 ? (
          categories.map((category: Category) => (
            <Link
              key={category.id}
              to={`/blog/category/${category.slug}`}
              className="block py-2 px-3 text-[#6E59A5] hover:bg-[#F8F7FF] rounded-md transition-colors"
            >
              {category.name}
            </Link>
          ))
        ) : (
          <p className="text-gray-500">No categories found</p>
        )}
      </div>
    </div>
  );
};

export default BlogCategoriesList;
