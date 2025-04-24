
import React, { useState } from "react";
import { 
  AlertCircle,
  BookOpen, 
  FileQuestion, 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone, 
  PlayCircle, 
  PlusCircle, 
  Video,
  Send
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";

const HelpSupport = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("medium");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the support ticket to the backend
    toast.success("Your support ticket has been submitted successfully!");
    // Reset form
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setPriority("medium");
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Help & Support</CardTitle>
            <CardDescription>
              Find answers to common questions and get support.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="faq">
                <AccordionTrigger className="flex items-center text-left">
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="w-5 h-5 text-gray-500" />
                    <span>Frequently Asked Questions</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <p>
                    Here you can find answers to common questions about our
                    services.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="docs">
                <AccordionTrigger className="flex items-center text-left">
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5 text-gray-500" />
                    <span>Documentation</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <p>
                    Explore our detailed documentation to understand how to use
                    our platform effectively.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="videos">
                <AccordionTrigger className="flex items-center text-left">
                  <div className="flex items-center space-x-3">
                    <Video className="w-5 h-5 text-gray-500" />
                    <span>Video Tutorials</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <p>
                    Watch our video tutorials for step-by-step guidance on using
                    our services.
                  </p>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="troubleshooting">
                <AccordionTrigger className="flex items-center text-left">
                  <div className="flex items-center space-x-3">
                    <FileQuestion className="w-5 h-5 text-gray-500" />
                    <span>Troubleshooting</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="p-4">
                  <p>
                    Find solutions to common issues and learn how to troubleshoot
                    problems.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>
              Need help with something specific? Submit a support ticket and our team will get back to you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input 
                    id="name" 
                    placeholder="Your name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Your email address" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    placeholder="Brief description of your issue" 
                    value={subject} 
                    onChange={(e) => setSubject(e.target.value)} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={priority} 
                    onValueChange={setPriority}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea 
                  id="message" 
                  placeholder="Please describe your issue in detail" 
                  className="min-h-[150px]" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  required
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto flex items-center gap-2">
                <Send className="w-4 h-4" />
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Support</CardTitle>
            <CardDescription>
              Need further assistance? Contact our support team directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-card">
                <CardContent className="flex items-center space-x-4 p-4">
                  <Mail className="w-6 h-6 text-blue-500" />
                  <div>
                    <CardTitle>Email Us</CardTitle>
                    <CardDescription>
                      Send us an email, and we'll get back to you as soon as
                      possible.
                    </CardDescription>
                    <Button variant="secondary">
                      <a href="mailto:support@example.com">Contact Support</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card">
                <CardContent className="flex items-center space-x-4 p-4">
                  <Phone className="w-6 h-6 text-green-500" />
                  <div>
                    <CardTitle>Call Us</CardTitle>
                    <CardDescription>
                      Give us a call during our business hours for immediate
                      assistance.
                    </CardDescription>
                    <Button variant="secondary">
                      <a href="tel:+18001234567">Call Support</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default HelpSupport;
