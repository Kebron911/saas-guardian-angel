import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Tag, RefreshCw, Filter, ArrowUpDown } from "lucide-react";
import { usePostgresBlogData } from "@/hooks/usePostgresBlogData";
import { usePostgresCategories } from "@/hooks/usePostgresBlogData";
import { useBlogData } from "@/hooks/useBlogData";
import BlogPostForm from "@/components/admin/BlogPostForm";
import BlogCategoryForm from "@/components/admin/BlogCategoryForm";
import { BlogCategory, BlogPostWithCategory, BlogPostInput, BlogCategoryInput } from "@/types/blog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BlogPostsTable from "@/components/admin/BlogPostsTable";
import BlogCategoriesTable from "@/components/admin/BlogCategoriesTable";
import BlogSampleCreator from "@/components/admin/BlogSampleCreator";
import { apiClient } from "@/lib/api-client";
import { toast } from "@/hooks/use-toast";
import { updateBlogCategory, deleteBlogCategory, createBlogCategory } from "@/services/blogCategoryService";

const AdminBlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | undefined>(undefined);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{ id: string; type: "post" | "category" } | null>(null);
  const [currentTab, setCurrentTab] = useState("published");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isEditLoading, setIsEditLoading] = useState(false);
  
  // Filter and sort states
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("date");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  
  // PostgreSQL data for posts
  const { 
    publishedPosts, 
    draftPosts, 
    isLoading: postsLoading, 
    error: postsError,
    fetchPosts,
    fetchPostById,
    deletePost
  } = usePostgresBlogData();

  // PostgreSQL data for categories
  const { categories, isLoading: categoriesLoading, error: categoriesError, fetchCategories } = usePostgresCategories();
  
  const isLoading = postsLoading || categoriesLoading;
  const error = postsError || categoriesError;
  
  // Filter and sort functions
  const filterAndSortPosts = (posts: any[]) => {
    let filtered = posts.filter(post => 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(post.category_names) && post.category_names.some((cat: string) => cat.toLowerCase().includes(searchQuery.toLowerCase())))
    );

    if (categoryFilter !== "all") {
      filtered = filtered.filter(post => Array.isArray(post.category_names) && post.category_names.includes(categoryFilter));
    }

    return filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case "title":
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case "category":
          aValue = (a.category_names && a.category_names[0]) ? a.category_names[0].toLowerCase() : "";
          bValue = (b.category_names && b.category_names[0]) ? b.category_names[0].toLowerCase() : "";
          break;
        case "views":
          aValue = a.views || 0;
          bValue = b.views || 0;
          break;
        case "comments":
          aValue = a.comments || 0;
          bValue = b.comments || 0;
          break;
        case "date":
        default:
          aValue = new Date(a.date || 0).getTime();
          bValue = new Date(b.date || 0).getTime();
          break;
      }
      
      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const getUniqueCategories = (posts: any[]) => {
    const categories = [...new Set(posts.flatMap(post => post.category_names || []))];
    return categories.sort();
  };
  
  const handleCreatePost = () => {
    setSelectedPost(undefined);
    setIsPostFormOpen(true);
  };
  
  const handleEditPost = async (post: any) => {
    setIsEditLoading(true);
    const fullPost = await fetchPostById(post.id);
    setSelectedPost(fullPost || post);
    setIsEditLoading(false);
    setIsPostFormOpen(true);
  };
  
  const handleViewPost = (slug: string) => {
    window.open(`/blog/${slug}`, '_blank');
  };
  
  const handleDeletePost = (id: string) => {
    setItemToDelete({ id, type: "post" });
    setDeleteDialogOpen(true);
  };
  
  const handleCreateCategory = () => {
    setSelectedCategory(undefined);
    setIsCategoryFormOpen(true);
  };
  
  const handleEditCategory = (category: BlogCategory) => {
    setSelectedCategory(category);
    setIsCategoryFormOpen(true);
  };
  
  const handleDeleteCategory = (id: string) => {
    setItemToDelete({ id, type: "category" });
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      if (itemToDelete.type === "post") {
        await deletePost(itemToDelete.id);
        await fetchPosts();
      } else {
        await deleteBlogCategory(itemToDelete.id);
        await fetchCategories();
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
    setDeleteDialogOpen(false);
  };
  
  const handleSubmitPost = async (values: BlogPostInput, categoryIds: string[]) => {
    if (selectedPost) {
      await updatePost(selectedPost.id, values, categoryIds);
    } else {
      await createPost(values, categoryIds);
    }
    // Refresh PostgreSQL data
    await fetchPosts();
  };
  
  const handleSubmitCategory = async (values: BlogCategoryInput) => {
    if (selectedCategory) {
      await updateBlogCategory(selectedCategory.id, values);
    } else {
      await createBlogCategory(values);
    }
    await fetchCategories(); // Refresh categories after create/update
  };
  
  // Helper to get selected category IDs for the edit form
  const getSelectedCategoryIds = () => {
    if (!selectedPost) return [];
    // If category_ids (array of IDs) exists, use it
    if (Array.isArray(selectedPost.category_ids) && selectedPost.category_ids.length > 0) {
      return selectedPost.category_ids.map(String);
    }
    // If category_names is present, map to IDs using categories from DB
    if (Array.isArray(selectedPost.category_names) && selectedPost.category_names.length > 0) {
      return selectedPost.category_names
        .map((catName: string) => {
          const match = categories.find((c) => c.name === catName);
          return match ? String(match.id) : null;
        })
        .filter(Boolean);
    }
    return [];
  };
  
  const handleTabChange = (value: string) => {
    setCurrentTab(value);
  };
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchPosts();
      await fetchCategories();
    } finally {
      setIsRefreshing(false);
    }
  };
  
  // Add updatePost and createPost using the PostgreSQL API
  const updatePost = async (id: string, post: BlogPostInput, categoryIds: string[]) => {
    try {
      await apiClient.put(`/blog/posts/${id}`, { ...post, category_ids: categoryIds });
      toast({ title: "Success", description: "Blog post updated successfully." });
    } catch (err: any) {
      toast({ title: "Error", description: "Failed to update blog post: " + (err.message || "Unknown error"), variant: "destructive" });
      throw err;
    }
  };

  const createPost = async (post: BlogPostInput, categoryIds: string[]) => {
    try {
      await apiClient.post(`/blog/posts`, { ...post, category_ids: categoryIds });
      toast({ title: "Success", description: "Blog post created successfully." });
    } catch (err: any) {
      toast({ title: "Error", description: "Failed to create blog post: " + (err.message || "Unknown error"), variant: "destructive" });
      throw err;
    }
  };
  
  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading blog data...</div>
        </div>
      </AdminLayout>
    );
  }
  
  const hasContent = publishedPosts.length > 0 || draftPosts.length > 0 || categories.length > 0;
  const filteredPublishedPosts = filterAndSortPosts(publishedPosts);
  const filteredDraftPosts = filterAndSortPosts(draftPosts);
  const allPosts = [...publishedPosts, ...draftPosts];
  const uniqueCategories = getUniqueCategories(allPosts);
  
  return (
    <AdminLayout>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Blog Management</h2>
        <p className="text-gray-600 dark:text-gray-400">Create and manage your blog content</p>
      </div>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6 dark:bg-red-900/30 dark:border-red-700">
          <p className="text-red-700 dark:text-red-400">{error}</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2" 
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
        </div>
      )}
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 gap-4">
        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search posts..." 
              className="pl-10 w-full md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {(currentTab === "published" || currentTab === "drafts") && (
            <>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {uniqueCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="category">Category</SelectItem>
                  <SelectItem value="views">Views</SelectItem>
                  <SelectItem value="comments">Comments</SelectItem>
                </SelectContent>
              </Select>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                title={`Sort ${sortOrder === "asc" ? "Descending" : "Ascending"}`}
              >
                <ArrowUpDown className={`h-4 w-4 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
              </Button>
            </>
          )}
        </div>
        
        <div className="flex gap-2 w-full lg:w-auto">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="lg:hidden"
            title="Refresh Data"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="hidden lg:flex"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Button>
          <Button className="w-full lg:w-auto" onClick={handleCreatePost}>
            <Plus className="mr-2 h-4 w-4" /> New Post
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <Tabs defaultValue="published" value={currentTab} onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              {!hasContent && <TabsTrigger value="samples">Sample Content</TabsTrigger>}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <Tabs value={currentTab} onValueChange={handleTabChange}>
            <TabsContent value="published" className="mt-0">
              <BlogPostsTable 
                posts={filteredPublishedPosts}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onView={handleViewPost}
                filterQuery=""
                showPublished={true}
              />
            </TabsContent>
            
            <TabsContent value="drafts" className="mt-0">
              <BlogPostsTable 
                posts={filteredDraftPosts}
                onEdit={handleEditPost}
                onDelete={handleDeletePost}
                onView={handleViewPost}
                filterQuery=""
                showPublished={false}
              />
            </TabsContent>
            
            <TabsContent value="categories" className="mt-0">
              <BlogCategoriesTable 
                categories={categories}
                posts={[]}
                onEdit={handleEditCategory}
                onDelete={handleDeleteCategory}
              />
              
              <div className="mt-4">
                <Button variant="outline" onClick={handleCreateCategory}>
                  <Tag className="mr-2 h-4 w-4" /> Add Category
                </Button>
              </div>
            </TabsContent>
            
            {!hasContent && (
              <TabsContent value="samples" className="mt-0">
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Create Sample Blog Content</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    You don't have any blog posts or categories yet. Create sample content to get started quickly.
                  </p>
                  <BlogSampleCreator onComplete={fetchPosts} />
                </div>
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Post Form Dialog */}
      {isPostFormOpen && (
        isEditLoading ? (
          <div className="flex items-center justify-center p-12">Loading post...</div>
        ) : (
          <BlogPostForm
            post={selectedPost}
            categories={categories.map(c => ({ ...c, created_at: "" }))}
            selectedCategoryIds={getSelectedCategoryIds()}
            isOpen={isPostFormOpen}
            onClose={() => setIsPostFormOpen(false)}
            onSubmit={handleSubmitPost}
          />
        )
      )}
      
      {/* Category Form Dialog */}
      {isCategoryFormOpen && (
        <BlogCategoryForm
          category={selectedCategory}
          isOpen={isCategoryFormOpen}
          onClose={() => setIsCategoryFormOpen(false)}
          onSubmit={handleSubmitCategory}
        />
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              {itemToDelete?.type === "post" 
                ? "Are you sure you want to delete this post? This action cannot be undone."
                : "Are you sure you want to delete this category? This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminBlogPage;
