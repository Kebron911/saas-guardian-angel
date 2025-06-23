
import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Search,
  LifeBuoy,
  MessageSquare,
  FileText,
  Mail,
  Phone,
  BookOpen,
  Video,
  Users
} from "lucide-react";

const HelpSupport = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
    

      <div className="max-w-4xl mx-auto mb-12">
        <div className="relative mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            placeholder="Search for help articles, tutorials, and more..."
            className="pl-10 py-6 text-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" /> Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Browse our comprehensive documentation for guides, reference materials, and more.
              </p>
              <Button variant="outline" className="w-full">View Documentation</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Video className="mr-2 h-5 w-5" /> Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Watch step-by-step tutorials to learn how to set up and use our service.
              </p>
              <Button variant="outline" className="w-full">Watch Tutorials</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <BookOpen className="mr-2 h-5 w-5" /> Knowledge Base
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Find answers to common questions in our searchable knowledge base.
              </p>
              <Button variant="outline" className="w-full">Explore Articles</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" /> Community Forum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with other users, share experiences, and get community support.
              </p>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate("/forum")}
              >
                Join Discussion
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" /> Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Reach out to our support team via email for personalized assistance.
              </p>
              <Button variant="outline" className="w-full">Contact Support</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center">
                <LifeBuoy className="mr-2 h-5 w-5" /> Live Chat
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Chat with our support team in real-time during business hours.
              </p>
              <Button variant="outline" className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Still need help?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
              <div className="text-center md:text-left">
                <p className="text-gray-600">
                  Our team is available Monday through Friday, 9am-6pm EST.
                </p>
                <div className="mt-4 flex items-center justify-center md:justify-start">
                  <Phone className="mr-2 h-5 w-5 text-gray-500" />
                  <span className="font-medium">1-800-123-4567</span>
                </div>
              </div>
              <Button className="px-8">Contact Us</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HelpSupport;
