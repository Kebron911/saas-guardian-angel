
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare, 
  User, 
  Search, 
  Filter, 
  Users, 
  TrendingUp,
  Star,
  BookOpen,
  Clock,
  CheckCircle
} from "lucide-react";
import { useForumPosts } from "@/hooks/useForumPosts";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import DashboardLayout from "@/components/DashboardLayout";

const CommunityForumPage = () => {
  const [activeTab, setActiveTab] = useState("discussions");
  const { posts, categories, isLoading } = useForumPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === "all" || 
      post.category === selectedCategory;
      
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Community Forum</h1>
          <p className="text-gray-600">Connect with other users, share insights, and get help from the community</p>
        </div>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
          <div className="md:w-3/4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input 
                placeholder="Search discussions..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Button className="flex items-center">
            <MessageSquare className="mr-2 h-5 w-5" />
            New Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2">
                  <Button 
                    variant={selectedCategory === "all" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setSelectedCategory("all")}
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    All Discussions
                  </Button>
                  
                  {categories.map(category => (
                    <Button 
                      key={category.id} 
                      variant={selectedCategory === category.slug ? "default" : "ghost"} 
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category.slug)}
                    >
                      {category.icon === 'Star' && <Star className="mr-2 h-4 w-4" />}
                      {category.icon === 'Users' && <Users className="mr-2 h-4 w-4" />}
                      {category.icon === 'TrendingUp' && <TrendingUp className="mr-2 h-4 w-4" />}
                      {category.icon === 'BookOpen' && <BookOpen className="mr-2 h-4 w-4" />}
                      {category.name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-4">
              <CardHeader className="pb-3">
                <CardTitle>Forum Stats</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total Discussions</span>
                    <span className="font-medium">{posts.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Active Members</span>
                    <span className="font-medium">287</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Resolved Topics</span>
                    <span className="font-medium">143</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="discussions">Latest Discussions</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
                <TabsTrigger value="solved">Solved</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discussions" className="space-y-4">
                {isLoading ? (
                  <div className="flex justify-center my-12">
                    <LoadingSpinner size="lg" />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  filteredPosts.map(post => (
                    <Card key={post.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                post.category === "general" ? "bg-gray-100 text-gray-800" :
                                post.category === "tips" ? "bg-blue-100 text-blue-800" :
                                post.category === "help" ? "bg-yellow-100 text-yellow-800" :
                                "bg-green-100 text-green-800"
                              }`}>
                                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                              </span>
                              {post.solved && (
                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Solved
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">
                              <a href={`#/forum/${post.id}`} className="hover:text-blue-600 transition-colors">
                                {post.title}
                              </a>
                            </h3>
                            <p className="text-gray-600 text-sm">{post.excerpt}</p>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3 text-center min-w-[60px]">
                            <div className="text-xl font-semibold">{post.replies}</div>
                            <div className="text-xs text-gray-500">replies</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-4 w-4 text-gray-600" />
                            </div>
                            <span className="text-sm font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.posted}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <div className="py-8">
                        <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No discussions found</h3>
                        <p className="text-gray-500">
                          {searchTerm ? "Try a different search term or category filter" : "Be the first to start a discussion!"}
                        </p>
                        <Button className="mt-4">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          New Discussion
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
              
              <TabsContent value="popular" className="space-y-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-8">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Popular Discussions</h3>
                      <p className="text-gray-500 mt-2">Coming soon!</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="unanswered" className="space-y-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Unanswered Discussions</h3>
                      <p className="text-gray-500 mt-2">Coming soon!</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="solved" className="space-y-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="py-8">
                      <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium">Solved Discussions</h3>
                      <p className="text-gray-500 mt-2">Coming soon!</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CommunityForumPage;
