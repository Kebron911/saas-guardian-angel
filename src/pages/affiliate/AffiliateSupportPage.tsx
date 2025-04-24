
import React from "react";
import AffiliateLayout from "@/components/affiliate/AffiliateLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Phone,
  FileText,
  ArrowRight,
} from "lucide-react";

const AffiliateSupportPage = () => {
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Help & Support</h2>
          <p className="text-muted-foreground">Find resources and get assistance with the affiliate program</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-[#1A237E]" />
                Affiliate FAQ
              </CardTitle>
              <CardDescription>Get answers to common questions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I get my affiliate link?</AccordionTrigger>
                  <AccordionContent>
                    Your unique affiliate link is available on your main dashboard. You can copy it directly from there or generate a QR code to share with others.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>When do I get paid my commissions?</AccordionTrigger>
                  <AccordionContent>
                    Commissions are calculated at the end of each month. Payouts are processed on the 1st of each month for all earnings that exceed the minimum threshold of $100.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does the two-tier system work?</AccordionTrigger>
                  <AccordionContent>
                    You earn 20% commission on direct referrals (Tier 1) and 10% when those referrals bring in new customers (Tier 2). This creates a passive income stream as your network grows.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger>Can I promote on social media?</AccordionTrigger>
                  <AccordionContent>
                    Yes! We encourage promotion on social media. Use our pre-made assets or create your own. Just be sure to disclose your affiliate relationship and follow our content guidelines.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger>What if my referral asks for a refund?</AccordionTrigger>
                  <AccordionContent>
                    If a referral requests a refund, the associated commission will be reversed. This ensures fair compensation aligned with actual revenue generation.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
            <CardFooter className="flex justify-center border-t pt-4">
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View Full FAQ Document
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#00B8D4]" />
                Contact Affiliate Manager
              </CardTitle>
              <CardDescription>Get personalized assistance with your questions</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <form className="space-y-4">
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What can we help you with?" />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Please describe your question or issue in detail"
                    rows={5}
                  />
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <p className="text-sm text-gray-600">Response time: within 24 hours</p>
                  <Button type="submit" className="bg-[#1A237E]">
                    Send Message
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Additional Support Options</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto justify-start flex-col items-start p-4 text-left">
                <div className="flex items-center w-full mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#1A237E]/10 flex items-center justify-center mr-3">
                    <MessageSquare className="h-4 w-4 text-[#1A237E]" />
                  </div>
                  <span className="font-medium">Live Chat</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </div>
                <p className="text-sm text-gray-600">Chat with our support team during business hours</p>
              </Button>
              
              <Button variant="outline" className="h-auto justify-start flex-col items-start p-4 text-left">
                <div className="flex items-center w-full mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#00B8D4]/10 flex items-center justify-center mr-3">
                    <Phone className="h-4 w-4 text-[#00B8D4]" />
                  </div>
                  <span className="font-medium">Phone Support</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </div>
                <p className="text-sm text-gray-600">Call us Mon-Fri, 9am-5pm EST</p>
              </Button>
              
              <Button variant="outline" className="h-auto justify-start flex-col items-start p-4 text-left">
                <div className="flex items-center w-full mb-2">
                  <div className="h-8 w-8 rounded-full bg-[#FF6F61]/10 flex items-center justify-center mr-3">
                    <MessageSquare className="h-4 w-4 text-[#FF6F61]" />
                  </div>
                  <span className="font-medium">Community Forum</span>
                  <ArrowRight className="h-4 w-4 ml-auto" />
                </div>
                <p className="text-sm text-gray-600">Connect with other affiliates and share tips</p>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tips for Success</CardTitle>
            <CardDescription>Make the most of your affiliate partnership</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A237E]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#1A237E]">1</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Know the product</h4>
                    <p className="text-sm text-gray-600">The more you understand our services, the better you can promote them to your audience.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A237E]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#1A237E]">2</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Use marketing materials</h4>
                    <p className="text-sm text-gray-600">Our professionally designed assets will help increase your conversion rates.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#1A237E]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#1A237E]">3</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Track your results</h4>
                    <p className="text-sm text-gray-600">Regularly check your dashboard to see what's working and what needs improvement.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8D4]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#00B8D4]">4</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Share your experience</h4>
                    <p className="text-sm text-gray-600">Authentic testimonials and use cases build trust with potential customers.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8D4]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#00B8D4]">5</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Leverage your network</h4>
                    <p className="text-sm text-gray-600">Encourage your referrals to become affiliates too for tier 2 commissions.</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#00B8D4]/10 flex items-center justify-center mr-3 mt-0.5">
                    <span className="font-semibold text-[#00B8D4]">6</span>
                  </div>
                  <div>
                    <h4 className="font-medium mb-1">Ask for help</h4>
                    <p className="text-sm text-gray-600">Our affiliate team is here to support your success - don't hesitate to reach out.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliateSupportPage;
