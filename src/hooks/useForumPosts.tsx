
import { useState, useEffect } from "react";

export interface ForumCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  count: number;
}

export interface ForumPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  replies: number;
  views: number;
  posted: string;
  solved: boolean;
}

export const useForumPosts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [categories, setCategories] = useState<ForumCategory[]>([]);

  // Simulated data for the community forum
  useEffect(() => {
    // Simulate API call delay
    const timer = setTimeout(() => {
      const sampleCategories: ForumCategory[] = [
        {
          id: "1",
          name: "General Discussion",
          slug: "general",
          icon: "MessageSquare",
          count: 48
        },
        {
          id: "2",
          name: "Tips & Tricks",
          slug: "tips",
          icon: "Star",
          count: 27
        },
        {
          id: "3",
          name: "Help & Support",
          slug: "help",
          icon: "Users",
          count: 36
        },
        {
          id: "4",
          name: "Feature Requests",
          slug: "features",
          icon: "TrendingUp",
          count: 19
        },
        {
          id: "5",
          name: "Tutorials",
          slug: "tutorials",
          icon: "BookOpen",
          count: 12
        }
      ];

      const samplePosts: ForumPost[] = [
        {
          id: "1",
          title: "Getting started with virtual receptionist setup",
          excerpt: "I'm new to the platform and wanted to know the best practices for setting up my virtual receptionist...",
          author: "John Smith",
          category: "general",
          replies: 12,
          views: 238,
          posted: "3 hours ago",
          solved: false
        },
        {
          id: "2",
          title: "How to handle multiple business locations?",
          excerpt: "My business has 3 different locations. What's the best way to set up my receptionist to handle calls for all locations?",
          author: "Sarah Johnson",
          category: "help",
          replies: 8,
          views: 156,
          posted: "Yesterday",
          solved: true
        },
        {
          id: "3",
          title: "Pro tip: Custom greetings for repeat callers",
          excerpt: "I've found a way to create personalized greetings for my frequent clients, here's how...",
          author: "Michael Brown",
          category: "tips",
          replies: 24,
          views: 432,
          posted: "3 days ago",
          solved: false
        },
        {
          id: "4",
          title: "Request: After-hours voicemail transcription",
          excerpt: "It would be really helpful to have voicemail transcription for after-hours calls...",
          author: "Jennifer Lee",
          category: "features",
          replies: 17,
          views: 284,
          posted: "Last week",
          solved: false
        },
        {
          id: "5",
          title: "Complete guide to reducing call handling time",
          excerpt: "I've compiled a step-by-step guide on optimizing your virtual receptionist settings to reduce call times...",
          author: "David Wilson",
          category: "tutorials",
          replies: 36,
          views: 587,
          posted: "2 weeks ago",
          solved: true
        },
        {
          id: "6",
          title: "Integration with Salesforce CRM",
          excerpt: "Has anyone successfully integrated the receptionist with Salesforce? Looking for tips...",
          author: "Emma Garcia",
          category: "help",
          replies: 9,
          views: 178,
          posted: "2 weeks ago",
          solved: false
        },
        {
          id: "7",
          title: "Share your ROI from implementing virtual receptionist",
          excerpt: "I'd be interested to hear how much time/money others have saved since implementing this solution...",
          author: "Robert Taylor",
          category: "general",
          replies: 28,
          views: 496,
          posted: "3 weeks ago",
          solved: false
        }
      ];

      setPosts(samplePosts);
      setCategories(sampleCategories);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return {
    isLoading,
    posts,
    categories
  };
};
