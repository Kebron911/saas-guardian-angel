
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PlusIcon, Pencil, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

interface Category {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be in kebab-case format"),
});

type FormValues = z.infer<typeof categorySchema>;

const BlogCategoriesList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });
  
  const fetchCategories = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchCategories();
  }, []);
  
  useEffect(() => {
    if (currentCategory && isEditing) {
      form.reset({
        name: currentCategory.name,
        slug: currentCategory.slug,
      });
    } else {
      form.reset({ name: "", slug: "" });
    }
  }, [currentCategory, isEditing, form]);
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    
    // Auto-generate slug from name when adding a new category
    if (!isEditing) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
        
      form.setValue("slug", slug);
    }
  };
  
  const openNewCategoryDialog = () => {
    setCurrentCategory(null);
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const openEditCategoryDialog = (category: Category) => {
    setCurrentCategory(category);
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && currentCategory) {
        // Update existing category
        const { error } = await supabase
          .from("blog_categories")
          .update({
            name: values.name,
            slug: values.slug,
          })
          .eq("id", currentCategory.id);
          
        if (error) throw error;
        
        setCategories(categories.map(cat => 
          cat.id === currentCategory.id 
            ? { ...cat, name: values.name, slug: values.slug } 
            : cat
        ));
        
        toast.success("Category updated successfully");
      } else {
        // Create new category
        const { data, error } = await supabase
          .from("blog_categories")
          .insert({
            name: values.name,
            slug: values.slug,
          })
          .select()
          .single();
          
        if (error) throw error;
        
        setCategories([...categories, data]);
        toast.success("Category created successfully");
      }
      
      setDialogOpen(false);
    } catch (error: any) {
      console.error("Error saving category:", error);
      if (error.code === "23505") {
        toast.error("A category with this name or slug already exists");
      } else {
        toast.error("Failed to save category");
      }
    }
  };
  
  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;
    
    try {
      // First check if category is used in any posts
      const { data, error: checkError } = await supabase
        .from("blog_post_categories")
        .select("post_id")
        .eq("category_id", categoryToDelete);
        
      if (checkError) throw checkError;
      
      if (data && data.length > 0) {
        toast.error(`Cannot delete category: It's used by ${data.length} posts`);
        return;
      }
      
      // Delete the category
      const { error } = await supabase
        .from("blog_categories")
        .delete()
        .eq("id", categoryToDelete);
        
      if (error) throw error;
      
      setCategories(categories.filter(cat => cat.id !== categoryToDelete));
      toast.success("Category deleted successfully");
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete category");
    } finally {
      setCategoryToDelete(null);
      setDeleteDialogOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Categories</h3>
        <Button onClick={openNewCategoryDialog}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      {loading ? (
        <div className="text-center py-4">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No categories found.</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditCategoryDialog(category)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => {
                        setCategoryToDelete(category.id);
                        setDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Category" : "Add Category"}
            </DialogTitle>
            <DialogDescription>
              {isEditing 
                ? "Update the category details below." 
                : "Create a new category for your blog posts."}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Category name" 
                        {...field} 
                        onChange={handleNameChange}
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
                        placeholder="category-slug" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {isEditing ? "Update" : "Create"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this category. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteCategory}
              className="bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogCategoriesList;
