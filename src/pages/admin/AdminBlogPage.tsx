
import React, { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BlogPostList from "@/components/admin/blog/BlogPostList";
import BlogPostEditor from "@/components/admin/blog/BlogPostEditor";
import BlogCategoriesList from "@/components/admin/blog/BlogCategoriesList";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

const AdminBlogPage = () => {
  const [selectedTab, setSelectedTab] = useState("posts");
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [isNewPost, setIsNewPost] = useState(false);
  
  const handleCreateNewPost = () => {
    setSelectedPostId(null);
    setIsNewPost(true);
    setSelectedTab("editor");
  };
  
  const handleEditPost = (postId: string) => {
    setSelectedPostId(postId);
    setIsNewPost(false);
    setSelectedTab("editor");
  };
  
  const handlePostSaved = () => {
    toast.success(isNewPost ? "Blog post created successfully" : "Blog post updated successfully");
    setSelectedTab("posts");
    setIsNewPost(false);
  };

  const handlePostCancel = () => {
    setSelectedTab("posts");
    setIsNewPost(false);
    setSelectedPostId(null);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Blog Management</h2>
        <Button onClick={handleCreateNewPost}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <Tabs defaultValue={selectedTab} value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList>
              <TabsTrigger value="posts">Blog Posts</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              {selectedTab === "editor" && (
                <TabsTrigger value="editor">
                  {isNewPost ? "New Post" : "Edit Post"}
                </TabsTrigger>
              )}
            </TabsList>
          
            <CardContent className="pt-4">
              <TabsContent value="posts" className="mt-0">
                <BlogPostList onEditPost={handleEditPost} />
              </TabsContent>
              <TabsContent value="categories" className="mt-0">
                <BlogCategoriesList />
              </TabsContent>
              <TabsContent value="editor" className="mt-0">
                <BlogPostEditor 
                  postId={selectedPostId} 
                  isNew={isNewPost} 
                  onSaved={handlePostSaved} 
                  onCancel={handlePostCancel}
                />
              </TabsContent>
            </CardContent>
          </Tabs>
        </CardHeader>
      </Card>
    </AdminLayout>
  );
};

export default AdminBlogPage;
