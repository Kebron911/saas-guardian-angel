
import React, { useState, useEffect } from "react";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { BlogCategory, BlogCategoryInput } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
});

type FormValues = z.infer<typeof formSchema>;

interface BlogCategoryFormProps {
  category?: BlogCategory;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: BlogCategoryInput) => Promise<void>;
}

const BlogCategoryForm = ({
  category,
  isOpen,
  onClose,
  onSubmit,
}: BlogCategoryFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const defaultValues: FormValues = {
    name: category?.name || "",
    slug: category?.slug || "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  
  // Update form when category changes
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        slug: category.slug,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [category, form]);

  const handleSubmit = async (values: FormValues) => {
    try {
      setIsSubmitting(true);
      console.log("Submitting category form with values:", values);
      
      // Create a properly typed input object
      const categoryInput: BlogCategoryInput = {
        name: values.name,
        slug: values.slug
      };
      
      await onSubmit(categoryInput);
      toast({
        title: "Success",
        description: category ? "Category updated successfully" : "Category created successfully"
      });
      onClose();
    } catch (error: any) {
      console.error("Error saving category:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save category",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = () => {
    const name = form.getValues("name");
    if (name) {
      const slug = name
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-");
      form.setValue("slug", slug);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Create New Category"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
                      onBlur={() => {
                        if (!category && !form.getValues("slug")) {
                          generateSlug();
                        }
                      }}
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
                    <div className="flex gap-2">
                      <Input placeholder="category-slug" {...field} />
                      {!category && (
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
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : category ? "Update Category" : "Create Category"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BlogCategoryForm;
