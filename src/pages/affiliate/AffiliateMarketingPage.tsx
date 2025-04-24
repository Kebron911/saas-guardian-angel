
import React from "react";
import AffiliateLayout from "@/components/affiliate/AffiliateLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  FileImage, 
  FileText, 
  Mail, 
  FileVideo, 
  Download,
  Twitter,
  MessageSquare,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MarketingAssetProps {
  name: string;
  type: string;
  size: string;
  downloads: number;
  previewUrl: string;
}

const marketingAssets: MarketingAssetProps[] = [
  { name: "Homepage Banner", type: "PNG", size: "1200x628px", downloads: 124, previewUrl: "https://placehold.co/600x200" },
  { name: "Profile Banner", type: "PNG", size: "800x600px", downloads: 98, previewUrl: "https://placehold.co/600x200" },
  { name: "Email Header", type: "JPG", size: "600x200px", downloads: 76, previewUrl: "https://placehold.co/600x200" },
  { name: "Sidebar Ad", type: "PNG", size: "300x600px", downloads: 52, previewUrl: "https://placehold.co/300x600" },
  { name: "Mobile Banner", type: "PNG", size: "320x100px", downloads: 47, previewUrl: "https://placehold.co/320x100" },
  { name: "Square Social", type: "PNG", size: "1080x1080px", downloads: 118, previewUrl: "https://placehold.co/600x600" },
];

const emailTemplates = [
  { name: "New Customer Welcome", type: "HTML", downloads: 86 },
  { name: "Product Announcement", type: "HTML", downloads: 64 },
  { name: "Special Offer", type: "HTML", downloads: 92 },
  { name: "Follow-up Sequence", type: "HTML", downloads: 57 },
];

const videoAssets = [
  { name: "Product Demo", duration: "2:15", type: "MP4", downloads: 72 },
  { name: "Customer Testimonial", duration: "1:45", type: "MP4", downloads: 53 },
  { name: "Feature Overview", duration: "3:20", type: "MP4", downloads: 48 },
];

const socialCaptions = [
  { name: "Product Launch", platform: "All", downloads: 114 },
  { name: "Special Offer", platform: "All", downloads: 98 },
  { name: "Testimonials", platform: "All", downloads: 76 },
];

const AssetCard = ({ asset }: { asset: MarketingAssetProps }) => (
  <Card className="overflow-hidden">
    <img 
      src={asset.previewUrl} 
      alt={asset.name} 
      className="w-full h-40 object-cover border-b border-gray-100"
    />
    <CardContent className="p-4">
      <h3 className="font-medium mb-1">{asset.name}</h3>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{asset.type} • {asset.size}</span>
        <span>{asset.downloads} downloads</span>
      </div>
      <Button size="sm" className="w-full flex items-center justify-center gap-1">
        <Download className="h-4 w-4" /> Download
      </Button>
    </CardContent>
  </Card>
);

const AffiliateMarketingPage = () => {
  return (
    <AffiliateLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Marketing Assets</h2>
          <p className="text-muted-foreground">Download ready-to-use promotional materials to boost your referrals</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Promotional Tools</CardTitle>
            <CardDescription>
              Use these tools to promote our services across your channels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto flex flex-col items-center py-6 px-2 bg-gray-50">
                <FileImage className="h-8 w-8 mb-2 text-[#1A237E]" />
                <span className="text-sm font-medium">Banners</span>
                <span className="text-xs text-gray-500">6 items</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center py-6 px-2 bg-gray-50">
                <Mail className="h-8 w-8 mb-2 text-[#00B8D4]" />
                <span className="text-sm font-medium">Email Templates</span>
                <span className="text-xs text-gray-500">4 items</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center py-6 px-2 bg-gray-50">
                <FileVideo className="h-8 w-8 mb-2 text-[#FF6F61]" />
                <span className="text-sm font-medium">Videos</span>
                <span className="text-xs text-gray-500">3 items</span>
              </Button>
              
              <Button variant="outline" className="h-auto flex flex-col items-center py-6 px-2 bg-gray-50">
                <FileText className="h-8 w-8 mb-2 text-gray-700" />
                <span className="text-sm font-medium">Social Captions</span>
                <span className="text-xs text-gray-500">3 items</span>
              </Button>
            </div>
            
            <div className="mt-6 bg-gray-50 p-4 rounded-md flex items-center justify-between">
              <div>
                <h3 className="font-medium">Need custom marketing materials?</h3>
                <p className="text-sm text-gray-600">Contact our affiliate team for tailored assets</p>
              </div>
              <Button variant="default" className="bg-[#1A237E]">Request Custom Asset</Button>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="banners">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="banners">Banners</TabsTrigger>
              <TabsTrigger value="email">Email Templates</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="social">Social Captions</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-1" /> Download All
              </Button>
            </div>
          </div>
          
          <TabsContent value="banners" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketingAssets.map((asset, index) => (
                <AssetCard key={index} asset={asset} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="email" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {emailTemplates.map((template, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#00B8D4]/20 flex items-center justify-center mr-3">
                        <Mail className="h-5 w-5 text-[#00B8D4]" />
                      </div>
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.type} • {template.downloads} downloads</p>
                      </div>
                    </div>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="video" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoAssets.map((video, index) => (
                <Card key={index}>
                  <div className="relative bg-gray-100 h-40 flex items-center justify-center">
                    <FileVideo className="h-12 w-12 text-gray-400" />
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs py-0.5 px-2 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{video.name}</h3>
                    <div className="flex justify-between text-sm text-gray-500 mb-3">
                      <span>{video.type}</span>
                      <span>{video.downloads} downloads</span>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {socialCaptions.map((caption, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-1">{caption.name}</h3>
                    <p className="text-sm text-gray-500 mb-3">For {caption.platform} platforms • {caption.downloads} downloads</p>
                    <div className="flex space-x-2 mb-4">
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <Twitter className="h-4 w-4" /> Twitter
                      </Button>
                      <Button size="sm" variant="outline" className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" /> Facebook
                      </Button>
                    </div>
                    <Button size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-1" /> Download All Formats
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Content Guidelines</CardTitle>
            <CardDescription>Follow these guidelines when promoting our services</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-[#00B8D4] mr-2">✓</span>
                <p>Use approved language and messaging found in our templates</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#00B8D4] mr-2">✓</span>
                <p>Ensure our logo is clearly visible and not distorted</p>
              </li>
              <li className="flex items-start">
                <span className="text-[#00B8D4] mr-2">✓</span>
                <p>Make it clear when you're promoting as an affiliate</p>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <p>Don't make exaggerated claims about results or earnings</p>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">✗</span>
                <p>Don't use spammy or misleading tactics to drive traffic</p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </AffiliateLayout>
  );
};

export default AffiliateMarketingPage;
