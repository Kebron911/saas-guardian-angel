import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { BlogPost, BlogCategory, BlogPostInput } from "@/types/blog";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Image, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  excerpt: z.string().optional(),
  slug: z.string().min(1, "Slug is required"),
  published: z.boolean().default(false),
  featured_image: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface BlogPostFormProps {
  post?: BlogPost;
  categories: BlogCategory[];
  selectedCategoryIds?: string[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BlogPostInput, categoryIds: string[]) => Promise<void>;
}

const BlogPostForm = ({
  post,
  categories,
  selectedCategoryIds = [],
  isOpen,
  onClose,
  onSubmit,
}: BlogPostFormProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(selectedCategoryIds);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultValues: FormValues = {
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    slug: post?.slug || "",
    published: post?.published || false,
    featured_image: post?.featured_image || "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Update form when post or selectedCategoryIds changes
  useEffect(() => {
    if (post) {
      form.reset({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt || "",
        slug: post.slug,
        published: post.published,
        featured_image: post.featured_image || "",
      });
      if (post.featured_image) {
        setImagePreview(post.featured_image);
      } else {
        setImagePreview(null);
      }
      // Always use selectedCategoryIds if provided (edit mode)
      if (selectedCategoryIds && selectedCategoryIds.length > 0) {
        setSelectedCategories(selectedCategoryIds.map(String));
      } else if (post.categories && Array.isArray(post.categories) && post.categories.length > 0) {
        // Try to map from post.categories (array of names or objects)
        if (typeof post.categories[0] === "object" && post.categories[0].id) {
          setSelectedCategories(post.categories.map((cat: any) => String(cat.id)));
        } else if (typeof post.categories[0] === "string") {
          // Map category names to IDs using categories prop
          const mapped = post.categories
            .map((catName: string) => {
              const match = categories.find((c) => c.name === catName);
              return match ? String(match.id) : null;
            })
            .filter(Boolean) as string[];
          setSelectedCategories(mapped);
        } else {
          setSelectedCategories([]);
        }
      } else {
        setSelectedCategories([]);
      }
    } else {
      form.reset(defaultValues);
      setImagePreview(null);
      setSelectedCategories([]);
    }
  }, [post, form, selectedCategoryIds, categories]);

  // Always sync selectedCategories with selectedCategoryIds if they change (edit mode)
  useEffect(() => {
    if (post && selectedCategoryIds && selectedCategoryIds.length > 0) {
      setSelectedCategories(selectedCategoryIds.map(String));
    }
  }, [selectedCategoryIds, post]);

  // Initialize selected categories robustly
  useEffect(() => {
    if (post) {
      // Use category_ids if present
      if ('category_ids' in post && Array.isArray((post as any).category_ids) && (post as any).category_ids.length > 0) {
        setSelectedCategories((post as any).category_ids.map(String));
      } else if ('categories' in post && Array.isArray((post as any).categories) && (post as any).categories.length > 0) {
        setSelectedCategories((post as any).categories.map((cat: any) => String(cat.id)));
      } else if (selectedCategoryIds && selectedCategoryIds.length > 0) {
        setSelectedCategories(selectedCategoryIds.map(String));
      } else {
        setSelectedCategories([]);
      }
    } else if (selectedCategoryIds && selectedCategoryIds.length > 0) {
      setSelectedCategories(selectedCategoryIds.map(String));
    } else {
      setSelectedCategories([]);
    }
  }, [post, selectedCategoryIds, categories]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Form values:", values);
      console.log("Selected categories:", selectedCategories);
      
      // Ensure we're explicitly passing a valid BlogPostInput
      const postInput: BlogPostInput = {
        title: values.title,
        content: values.content,
        excerpt: values.excerpt || "",
        slug: values.slug,
        published: values.published,
        featured_image: values.featured_image || "",
        // If we're publishing, set the published_at date
        published_at: values.published && !post?.published_at ? new Date().toISOString() : post?.published_at,
      };
      
      console.log("Submitting post data:", postInput);
      await onSubmit(postInput, selectedCategories);
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error",
        description: "Failed to save post: " + (error.message || "Unknown error"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Checkbox handler: use boolean value
  const handleCategoryToggle = (categoryId: string, checked?: boolean) => {
    setSelectedCategories((prev) => {
      if (checked === undefined) checked = !prev.includes(categoryId);
      return checked
        ? [...prev, categoryId]
        : prev.filter((id) => id !== categoryId);
    });
  };

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (limit to 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Image must be less than 2MB",
        variant: "destructive"
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please upload an image file",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsUploading(true);
      
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `blog_images/${fileName}`;

      // Check if the blog_images bucket exists, create it if not
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'blog_images');
      
      if (!bucketExists) {
        // Create the bucket
        const { error: createBucketError } = await supabase.storage.createBucket('blog_images', {
          public: true
        });
        
        if (createBucketError) {
          console.error('Error creating bucket:', createBucketError);
          throw createBucketError;
        }
      }
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog_images')
        .upload(filePath, file);
      
      if (error) throw error;
      
      // Get the public URL
      const { data: publicUrl } = supabase.storage
        .from('blog_images')
        .getPublicUrl(filePath);
      
      // Set the URL to the form
      form.setValue('featured_image', publicUrl.publicUrl);
      setImagePreview(publicUrl.publicUrl);
      
      toast({
        title: "Image uploaded",
        description: "Image has been successfully uploaded",
      });
    } catch (error: any) {
      console.error('Error uploading image:', error);
      
      toast({
        title: "Upload failed",
        description: error.message || "Failed to upload image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = () => {
    form.setValue('featured_image', '');
    setImagePreview(null);
  };

  const handleExternalImageUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    form.setValue('featured_image', url);
    setImagePreview(url.length > 0 ? url : null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{post ? "Edit Post" : "Create New Post"}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[calc(90vh-130px)] pr-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                        onBlur={() => {
                          if (!post && !form.getValues("slug")) {
                            generateSlug();
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <div className="flex gap-2">
                          <Input placeholder="post-slug" {...field} />
                          {!post && (
                            <Button 
                              type="button" 
                              variant="outline"
                              onClick={generateSlug}
                            >
                              Generate
                            </Button>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="published"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-end space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Published</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your blog post content here..."
                        className="min-h-[200px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A short summary of the post..."
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured_image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Featured Image</FormLabel>
                    <div className="space-y-4">
                      {imagePreview ? (
                        <div className="relative">
                          <img 
                            src={imagePreview} 
                            alt="Preview" 
                            className="w-full h-40 object-cover rounded-md"
                            onError={(e) => {
                              // Handle image load error
                              (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Found";
                            }}
                          />
                          <Button 
                            variant="destructive" 
                            size="icon"
                            type="button"
                            className="absolute top-2 right-2 rounded-full w-8 h-8"
                            onClick={removeImage}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <div 
                          className="border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                          onClick={triggerFileInput}
                        >
                          <Image className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="mt-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Click to upload an image
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              PNG, JPG, GIF up to 2MB
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={isUploading}
                      />
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                        </div>
                        <div className="relative flex justify-center text-xs">
                          <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">
                            or use URL
                          </span>
                        </div>
                      </div>
                      
                      <FormControl>
                        <Input 
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            handleExternalImageUrl(e);
                          }}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="mb-2">
                <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Current Categories</h4>
                {selectedCategories.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedCategories.map((catId) => {
                      const cat = categories.find((c) => c.id === catId);
                      return cat ? (
                        <span key={catId} className="px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-xs">
                          {cat.name}
                        </span>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400">No categories selected</span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category.id}`}
                        checked={selectedCategories.includes(category.id)}
                        onCheckedChange={(checked) => handleCategoryToggle(category.id, !!checked)}
                      />
                      <label
                        htmlFor={`category-${category.id}`}
                        className="text-sm font-medium leading-none cursor-pointer"
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
                {categories.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    No categories available. Create categories first.
                  </p>
                )}
              </div>
              
              <DialogFooter className="pt-4 sticky bottom-0 bg-white dark:bg-gray-950">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting || isUploading}>
                  {(isSubmitting || isUploading) ? "Saving..." : post ? "Update Post" : "Create Post"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostForm;
