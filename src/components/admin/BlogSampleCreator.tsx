
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { BlogPostInput, BlogCategoryInput } from "@/types/blog";
import { useToast } from "@/hooks/use-toast";
import { AlertTriangle } from "lucide-react";

const sampleCategories: BlogCategoryInput[] = [
  { name: "Technology", slug: "technology" },
  { name: "Business", slug: "business" },
  { name: "AI News", slug: "ai-news" },
  { name: "Industry Insights", slug: "industry-insights" }
];

const samplePosts = [
  {
    title: "How AI Receptionists Are Transforming Customer Service",
    content: "<p>Artificial Intelligence has revolutionized how businesses handle customer interactions. Modern AI receptionists can handle multiple calls simultaneously, provide 24/7 availability, and maintain consistent quality in every interaction.</p><p>Our research shows that businesses implementing AI receptionists report an average 35% increase in customer satisfaction and a 40% reduction in missed calls. These virtual assistants can schedule appointments, answer frequently asked questions, and route calls to the appropriate department without human intervention.</p><p>The technology behind these systems has advanced significantly in recent years. Natural Language Processing (NLP) capabilities now allow AI receptionists to understand context, detect emotions, and respond appropriately to complex queries.</p><p>Small businesses particularly benefit from this technology as it allows them to provide enterprise-level customer service without the overhead of a large receptionist team. As we move forward, we expect to see even more sophisticated AI receptionist solutions that can handle increasingly complex customer interactions.</p>",
    excerpt: "Discover how AI receptionist technology is helping businesses provide better customer service while reducing operational costs and improving efficiency.",
    slug: "how-ai-receptionists-transform-customer-service",
    featured_image: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=1200",
    categories: ["Technology", "AI News"]
  },
  {
    title: "The Future of Business Communication in 2025",
    content: "<p>Business communication is evolving at an unprecedented pace. By 2025, we anticipate several major shifts in how companies interact with customers, partners, and employees.</p><p>First, AI-driven communications will become the norm rather than the exception. Virtual assistants will handle routine communications, freeing human staff to focus on complex interactions that require empathy and creative problem-solving.</p><p>Second, augmented reality (AR) will transform remote meetings. Instead of video calls, participants will join virtual spaces where they can collaborate as if physically present. Documents and data will be manipulated in 3D space, making remote collaboration more intuitive and effective.</p><p>Third, voice search and voice-activated systems will dominate customer interactions. Businesses that optimize for voice search and implement voice-activated services will gain a significant competitive advantage.</p><p>Finally, hyper-personalization will become expected. Communications will be tailored not just to demographic segments but to individual preferences, history, and current context.</p><p>Companies that embrace these changes will thrive in the new communication landscape, while those that cling to outdated methods risk falling behind.</p>",
    excerpt: "Explore the major trends that will shape business communication by 2025, from AI assistants to augmented reality meetings.",
    slug: "future-business-communication-2025",
    featured_image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
    categories: ["Business", "Industry Insights"]
  },
  {
    title: "Small Business Guide to Implementing AI Solutions",
    content: "<p>Many small business owners believe AI implementation is beyond their reach—too expensive, too complex, or requiring specialized technical knowledge. This guide aims to dispel those myths and provide practical steps for small businesses to adopt AI solutions.</p><p>Start by identifying specific problems AI could solve in your business. Common areas include customer service, appointment scheduling, email management, and data analysis. Once you've identified your needs, research existing solutions rather than building custom ones—many affordable, subscription-based AI tools require minimal technical expertise to implement.</p><p>Begin with a small pilot project to demonstrate value before scaling up. For example, implement an AI chatbot on your website to handle frequently asked questions before expanding to more complex use cases.</p><p>Don't overlook the importance of data quality. Even the best AI solutions can't perform optimally with incomplete or inaccurate data. Invest time in organizing and cleaning your existing data before implementing AI tools.</p><p>Finally, prepare your team for the change. Be transparent about how AI will affect their roles and provide adequate training. Emphasize that AI will handle routine tasks, allowing team members to focus on more creative and strategic work.</p>",
    excerpt: "Learn how small businesses can implement AI solutions without breaking the bank or requiring a technical team.",
    slug: "small-business-guide-implementing-ai-solutions",
    featured_image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?q=80&w=1200",
    categories: ["Technology", "Business"]
  },
  {
    title: "The ROI of AI: Measuring the Business Impact of Artificial Intelligence",
    content: "<p>As AI adoption accelerates across industries, businesses face a critical challenge: how to measure the return on investment (ROI) of their AI initiatives. Traditional ROI calculations often fall short when applied to AI projects, which can deliver value in ways that are difficult to quantify.</p><p>This article presents a comprehensive framework for measuring AI ROI that goes beyond direct cost savings. We explore how to quantify improvements in customer satisfaction, employee productivity, decision-making accuracy, and innovation capacity—all areas where AI can deliver significant but less obvious value.</p><p>Case studies from various industries demonstrate successful approaches to AI ROI measurement. For example, a mid-sized insurance company implemented AI for claims processing and measured ROI not just in terms of reduced processing time but also increased customer satisfaction and reduced employee turnover.</p><p>We also address common pitfalls in AI ROI measurement, such as failing to account for ongoing maintenance and training costs or overlooking the value of data accumulated through AI systems.</p><p>By adopting a more nuanced approach to ROI measurement, businesses can make more informed decisions about AI investments and better communicate their value to stakeholders.</p>",
    excerpt: "Discover how to accurately measure the ROI of your AI investments beyond simple cost savings calculations.",
    slug: "roi-of-ai-measuring-business-impact",
    featured_image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
    categories: ["Business", "AI News"]
  },
  {
    title: "Voice AI Trends for 2025: What Businesses Need to Know",
    content: "<p>Voice AI technology is rapidly evolving, and businesses need to stay ahead of emerging trends to remain competitive. This article explores the most significant voice AI developments expected by 2025 and their implications for business strategy.</p><p>First, we're seeing a shift from general-purpose voice assistants to domain-specific experts. Rather than a single assistant handling all queries, businesses will deploy specialized voice AI for different functions, such as customer service, sales, or technical support.</p><p>Second, voice biometrics will become a mainstream security measure, replacing passwords in many applications. Voice authentication offers a convenient yet secure option that reduces friction in customer interactions.</p><p>Third, emotional intelligence in voice AI will advance significantly. Next-generation systems will detect subtle emotional cues in a caller's voice and adapt their tone and approach accordingly, creating more natural and empathetic interactions.</p><p>Fourth, voice search optimization will become as critical as SEO for many businesses. Companies will need to adapt their digital content to match how people speak rather than how they type.</p><p>Finally, multilingual capabilities will improve dramatically, allowing businesses to serve global customers in their preferred language without maintaining separate systems for each language.</p><p>Companies that anticipate these trends and adapt their voice AI strategies accordingly will gain significant advantages in customer experience and operational efficiency.</p>",
    excerpt: "Explore the five major voice AI trends that will shape business communications by 2025 and how to prepare for them.",
    slug: "voice-ai-trends-2025-business-guide",
    featured_image: "https://images.unsplash.com/photo-1585314614250-d213876625e1?q=80&w=1200",
    categories: ["Technology", "Industry Insights"]
  }
];

interface BlogSampleCreatorProps {
  onComplete: () => void;
}

const BlogSampleCreator = ({ onComplete }: BlogSampleCreatorProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const createSampleBlogPosts = async () => {
    try {
      setIsCreating(true);
      setProgress("Creating categories...");
      setError(null);
      
      console.log("Starting sample blog content creation");
      
      // First create categories directly with Supabase
      const categoryIds = new Map<string, string>();
      
      for (const categoryData of sampleCategories) {
        setProgress(`Creating category: ${categoryData.name}...`);
        try {
          const { data: catData, error: categoryError } = await supabase
            .from("blog_categories")
            .insert(categoryData)
            .select()
            .single();

          if (categoryError) {
            console.error(`Error creating category ${categoryData.name}:`, categoryError);
            throw categoryError;
          }
          
          if (catData) {
            console.log(`Created category ${categoryData.name} with ID ${catData.id}`);
            categoryIds.set(categoryData.name, catData.id);
          }
        } catch (error) {
          console.error(`Error creating category ${categoryData.name}:`, error);
          throw error;
        }
      }
      
      // Check if we have categories created
      if (categoryIds.size === 0) {
        // Fetch existing categories as backup
        setProgress("Fetching existing categories...");
        const { data: existingCategories, error: fetchCategoriesError } = await supabase
          .from("blog_categories")
          .select("*");

        if (fetchCategoriesError) {
          throw fetchCategoriesError;
        }
        
        if (existingCategories && existingCategories.length > 0) {
          existingCategories.forEach((cat: any) => {
            categoryIds.set(cat.name, cat.id);
          });
        }
      }

      console.log("Category IDs map:", Array.from(categoryIds.entries()));

      // Create posts
      for (const [index, postData] of samplePosts.entries()) {
        setProgress(`Creating post ${index + 1} of ${samplePosts.length}: ${postData.title}...`);
        
        // Create post with published set to true and published_at set to now
        const blogPostData = {
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          slug: postData.slug,
          published: true,
          published_at: new Date(Date.now() - index * 86400000 * 2).toISOString(), // Each post 2 days apart
          featured_image: postData.featured_image,
        };
        
        try {
          const { data: newPost, error: postError } = await supabase
            .from("blog_posts")
            .insert(blogPostData)
            .select()
            .single();

          if (postError) {
            console.error(`Error creating post ${postData.title}:`, postError);
            throw postError;
          }

          console.log(`Created post ${postData.title} with ID ${newPost.id}`);

          // Create category associations if we have the post and categories
          if (newPost && postData.categories) {
            for (const categoryName of postData.categories) {
              const categoryId = categoryIds.get(categoryName);
              
              if (categoryId) {
                console.log(`Associating category ${categoryName} (${categoryId}) with post ${newPost.id}`);
                
                const { data, error: relationError } = await supabase
                  .from("blog_post_categories")
                  .insert({
                    post_id: newPost.id,
                    category_id: categoryId
                  })
                  .select();

                if (relationError) {
                  console.error(`Error associating category ${categoryName} with post:`, relationError);
                  throw relationError;
                }
                
                console.log(`Successfully associated category ${categoryName} with post ${newPost.id}`);
              } else {
                console.warn(`Category ${categoryName} not found in categoryIds map`);
              }
            }
          }

          setProgress(`Successfully created post: ${postData.title}`);
        } catch (error: any) {
          console.error(`Error creating post ${postData.title}:`, error);
          throw error;
        }
      }
      
      toast({
        title: "Success",
        description: "Sample blog content created successfully."
      });
      
      onComplete();
    } catch (error: any) {
      console.error("Error creating sample content:", error);
      setError(error.message || "Failed to create sample content");
      toast({
        title: "Error",
        description: "Failed to create sample blog content. Please check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsCreating(false); // Fixed: Using setIsCreating instead of setIsLoading
      setProgress("");
    }
  };
  
  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 dark:bg-red-900/30 dark:border-red-700">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-sm text-red-700 dark:text-red-400">
              Error: {error}
            </p>
          </div>
          <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">
            Note: Please check if RLS policies are set up correctly for the blog tables. You may need to refresh the page after sample creation.
          </p>
        </div>
      )}
      
      <Button 
        onClick={createSampleBlogPosts} 
        disabled={isCreating}
        className="w-full"
      >
        {isCreating ? "Creating Sample Content..." : "Create Sample Blog Posts"}
      </Button>
      
      {progress && (
        <div className="text-sm text-muted-foreground">{progress}</div>
      )}
    </div>
  );
};

export default BlogSampleCreator;
