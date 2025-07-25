import React from "react";
import { Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCategory, BlogPostWithCategory } from "@/types/blog";

interface BlogCategoriesTableProps {
  categories: BlogCategory[];
  posts: BlogPostWithCategory[];
  onEdit: (category: BlogCategory) => void;
  onDelete: (id: string) => void;
}

const BlogCategoriesTable = ({ 
  categories, 
  posts,
  onEdit, 
  onDelete 
}: BlogCategoriesTableProps) => {
  return (
    <div className="rounded-md border dark:border-gray-700">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Category Name</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Slug</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Posts</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category: any) => {
              // Use backend 'posts' field if present, fallback to old logic
              const postsCount = typeof category.posts === 'number'
                ? category.posts
                : (posts.filter(post => post.categories?.some(cat => cat.id === category.id)).length);
              return (
                <tr 
                  key={category.id} 
                  className="border-b dark:border-gray-700 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
                >
                  <td className="p-4 align-middle">{category.name}</td>
                  <td className="p-4 align-middle">{category.slug}</td>
                  <td className="p-4 align-middle hidden md:table-cell">{postsCount}</td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete(category.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
            
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogCategoriesTable;
