import React from "react";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface PostgresBlogPost {
  id: string;
  title: string;
  slug: string;
  categories?: string[];
  date: string;
  views: number;
  comments: number;
  category_names?: string[];
}

interface BlogPostsTableProps {
  posts: PostgresBlogPost[];
  onEdit: (post: PostgresBlogPost) => void;
  onDelete: (id: string) => void;
  onView: (slug: string) => void;
  filterQuery: string;
  showPublished: boolean;
}

const BlogPostsTable = ({ 
  posts, 
  onEdit, 
  onDelete, 
  onView,
  showPublished
}: BlogPostsTableProps) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Draft";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  return (
    <div className="rounded-md border dark:border-gray-700">
      <div className="relative w-full overflow-auto">
        <table className="w-full caption-bottom text-sm">
          <thead>
            <tr className="border-b dark:border-gray-700 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50">
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400">Title</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Category</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">
                {showPublished ? "Date" : "Created"}
              </th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Views</th>
              <th className="h-12 px-4 text-left align-middle font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Comments</th>
              <th className="h-12 px-4 text-right align-middle font-medium text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr 
                key={post.id} 
                className="border-b dark:border-gray-700 transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
              >
                <td className="p-4 align-middle">{post.title}</td>
                <td className="p-4 align-middle hidden md:table-cell">
                  {/* Show category_names if present, else fallback to categories, else 'Uncategorized' */}
                  {Array.isArray(post.category_names) && post.category_names.length > 0
                    ? post.category_names.join(", ")
                    : Array.isArray(post.categories) && post.categories.length > 0
                    ? post.categories.join(", ")
                    : "Uncategorized"}
                </td>
                <td className="p-4 align-middle hidden md:table-cell">
                  {formatDate(post.date)}
                </td>
                <td className="p-4 align-middle hidden md:table-cell">{post.views}</td>
                <td className="p-4 align-middle hidden md:table-cell">{post.comments}</td>
                <td className="p-4 align-middle text-right">
                  <div className="flex justify-end gap-2">
                    {showPublished && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onView(post.slug)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(post)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => onDelete(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">
                  {showPublished 
                    ? "No published posts found." 
                    : "No draft posts found."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogPostsTable;
