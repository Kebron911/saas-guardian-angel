
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface BlogPostEditorProps {
  postId: string | null;
  isNew: boolean;
  onSaved: () => void;
  onCancel: () => void;
}

interface Category {
  id: string;
  name: string;
}

const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be in kebab-case format"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  featured_image: z.string().optional(),
  published: z.boolean().default(false),
  category_id: z.string().optional(),
});

type FormValues = z.infer<typeof blogPostSchema>;

const BlogPostEditor = ({ postId, isNew, onSaved, onCancel }: BlogPostEditorProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(isNew ? false : true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      featured_image: "",
      published: false,
      category_id: undefined,
    },
  });
  
  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("blog_categories")
          .select("*")
          .order("name", { ascending: true });
          
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    
    fetchCategories();
  }, []);
  
  // Fetch post data if editing an existing post
  useEffect(() => {
    const fetchPostData = async () => {
      if (!postId) return;
      
      setLoading(true);
      try {
        // Fetch post
        const { data: post, error: postError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .single();
          
        if (postError) throw postError;
        
        // Fetch post categories
        const { data: postCategories, error: catError } = await supabase
          .from("blog_post_categories")
          .select("category_id")
          .eq("post_id", postId);
          
        if (catError) throw catError;
        
        form.reset({
          title: post.title || "",
          slug: post.slug || "",
          excerpt: post.excerpt || "",
          content: post.content || "",
          featured_image: post.featured_image || "",
          published: post.published || false,
          category_id: postCategories[0]?.category_id || undefined,
        });
        
        setSelectedCategories(postCategories.map(pc => pc.category_id));
      } catch (error) {
        console.error("Error fetching post data:", error);
        toast.error("Failed to load post data");
      } finally {
        setLoading(false);
      }
    };
    
    if (!isNew) {
      fetchPostData();
    }
  }, [postId, isNew, form]);
  
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    form.setValue("title", title);
    
    // Auto-generate slug from title if creating a new post
    if (isNew) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special chars
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-"); // Replace multiple hyphens with single hyphen
        
      form.setValue("slug", slug);
    }
  };
  
  const onSubmit = async (values: FormValues) => {
    if (!user) {
      toast.error("You need to be logged in to save a blog post");
      return;
    }
    
    setSubmitting(true);
    try {
      let post_id = postId;
      
      // If creating a new post or updating an existing one
      if (isNew) {
        const { data: newPost, error } = await supabase
          .from("blog_posts")
          .insert([
            {
              title: values.title,
              slug: values.slug,
              excerpt: values.excerpt || null,
              content: values.content,
              featured_image: values.featured_image || null,
              author_id: user.id,
              published: values.published,
              published_at: values.published ? new Date().toISOString() : null,
            }
          ])
          .select("id")
          .single();
          
        if (error) throw error;
        post_id = newPost.id;
      } else {
        const { error } = await supabase
          .from("blog_posts")
          .update({
            title: values.title,
            slug: values.slug,
            excerpt: values.excerpt || null,
            content: values.content,
            featured_image: values.featured_image || null,
            published: values.published,
            published_at: values.published ? new Date().toISOString() : null,
            updated_at: new Date().toISOString(),
          })
          .eq("id", postId);
          
        if (error) throw error;
      }
      
      // If a category was selected
      if (values.category_id) {
        // First remove existing categories
        if (!isNew) {
          await supabase
            .from("blog_post_categories")
            .delete()
            .eq("post_id", post_id);
        }
        
        // Then add the selected category
        await supabase
          .from("blog_post_categories")
          .insert({
            post_id: post_id,
            category_id: values.category_id,
          });
      }
      
      onSaved();
    } catch (error) {
      console.error("Error saving blog post:", error);
      toast.error("Failed to save blog post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Post title" 
                    {...field} 
                    onChange={handleTitleChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="post-url-slug" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  The URL-friendly identifier for this post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Brief summary of the post" 
                  className="resize-none h-20"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                A short summary that appears in blog listings
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Write your blog post content here..." 
                  className="resize-none min-h-[300px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="featured_image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Featured Image URL</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://example.com/image.jpg" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  URL of the main image for this post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Assign a category to this post
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="published"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Publish immediately</FormLabel>
                <FormDescription>
                  If unchecked, the post will be saved as a draft
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isNew ? "Create Post" : "Update Post"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogPostEditor;
