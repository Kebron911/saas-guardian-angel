import React, { useState } from "react";
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
  Eye,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import DashboardPreview from "@/components/DashboardPreview";

interface MarketingAssetProps {
  name: string;
  type: string;
  size: string;
  downloads: number;
  previewUrl: string;
}

const marketingAssets: MarketingAssetProps[] = [
  { name: "Homepage Banner", type: "PNG", size: "1200x628px", downloads: 124, previewUrl: "/lovable-uploads/img/MarketingAssets/Homepagebanner.png" },
  { name: "Profile Banner", type: "PNG", size: "800x600px", downloads: 98, previewUrl: "/lovable-uploads/img/MarketingAssets/ProfileBanner.png" },
  { name: "Email Header", type: "PNG", size: "600x200px", downloads: 76, previewUrl: "/lovable-uploads/img/MarketingAssets/EmailHeader.png" },
  { name: "Sidebar Ad", type: "PNG", size: "300x600px", downloads: 52, previewUrl: "/lovable-uploads/img/MarketingAssets/SideAd.png" },
  { name: "Mobile Banner", type: "PNG", size: "320x100px", downloads: 47, previewUrl: "/lovable-uploads/img/MarketingAssets/MobileBanner.png" },
  { name: "Square Social", type: "PNG", size: "1080x1080px", downloads: 118, previewUrl: "/lovable-uploads/img/MarketingAssets/SquareSocial.png" },
];

const emailTemplates = [
  { name: "New Customer Welcome", type: "HTML", downloads: 86 },
  { name: "Product Announcement", type: "HTML", downloads: 64 },
  { name: "Special Offer", type: "HTML", downloads: 92 },
  { name: "Follow-up Sequence", type: "HTML", downloads: 57 },
];

  
const videoAssets = [
  { name: "Product Demo", type: "MP4", downloads: 72, previewUrl: "https://drive.google.com/file/d/1Qu_ri-IaPemxNGdVnOOwJT-Y8ZfeNvD3/preview" },
  { name: "Customer Testimonial", type: "MP4", downloads: 53, previewUrl: "https://drive.google.com/file/d/1DExO90zldik1UN4njIbpogchaIrHwrka/preview" },
  { name: "Feature Overview", type: "MP4", downloads: 48, previewUrl: "https://drive.google.com/file/d/1_QQL5Vo0tYNnab1U8-b-v4vsM6cnhgrr/preview"},
];

const socialCaptions = [
  { name: "Product Launch", platform: "All", downloads: 114 },
  { name: "Special Offer", platform: "All", downloads: 98 },
  { name: "Testimonials", platform: "All", downloads: 76 },
];

const downloadImage = (url: string, filename: string) => {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const AssetCard = ({ asset }: { asset: MarketingAssetProps }) => (
  <Card className="overflow-hidden">
    <div style={{ maxHeight: "10rem", overflow: "auto" }}>
      <img
        src={asset.previewUrl}
        alt={asset.name}
        className="w-full object-cover border-b border-gray-100"
        style={{ minHeight: "10rem" }}
      />
    </div>
    <CardContent className="p-4">
      <h3 className="font-medium mb-1">{asset.name}</h3>
      <div className="flex justify-between text-sm text-gray-500 mb-3">
        <span>{asset.type} • {asset.size}</span>
        <span>{asset.downloads} downloads</span>
      </div>
      <Button
        size="sm"
        className="w-full flex items-center justify-center gap-1"
        onClick={() => downloadImage(asset.previewUrl, `${asset.name.replace(/\s+/g, "_").toLowerCase()}.${asset.type.toLowerCase()}`)}
      >
        <Download className="h-4 w-4" /> Download
      </Button>
    </CardContent>
  </Card>
);

const AffiliateMarketingPage = () => {
  const [open, setOpen] = useState(false);
  const [request, setRequest] = useState({ name: "", email: "", details: "" });
  const [videoModal, setVideoModal] = useState<{ open: boolean; url: string; name: string }>({ open: false, url: "", name: "" });
  const [activeTab, setActiveTab] = useState("banners");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRequest({ ...request, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send request to backend or email
    setOpen(false);
    setRequest({ name: "", email: "", details: "" });
    alert("Your request has been submitted!");
  };

  const downloadAllImagesAsZip = async () => {
    const zip = new JSZip();
    const folder = zip.folder("marketing-assets");
    // Download each image and add to zip
    await Promise.all(
      marketingAssets.map(async (asset) => {
        const response = await fetch(asset.previewUrl);
        const blob = await response.blob();
        const ext = asset.type.toLowerCase();
        folder?.file(
          `${asset.name.replace(/\s+/g, "_").toLowerCase()}.${ext}`,
          blob
        );
      })
    );
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "marketing-assets.zip");
  };

  const downloadAllVideos = async () => {
    // For Google Drive links, trigger download for each video
    videoAssets.forEach((video) => {
      const a = document.createElement("a");
      a.href = video.previewUrl.replace("/preview", "?export=download");
      a.download = `${video.name.replace(/\s+/g, "_").toLowerCase()}.mp4`;
      a.target = "_blank";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  };

  const downloadAllEmailTemplates = async () => {
    // This is a placeholder; implement as needed for your app
    alert("Bulk download for email templates is not implemented.");
  };

  const downloadAllSocialCaptions = async () => {
    // This is a placeholder; implement as needed for your app
    alert("Bulk download for social captions is not implemented.");
  };

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
              <Button variant="default" className="bg-[#1A237E]" onClick={() => setOpen(true)}>
                Request Custom Asset
              </Button>
            </div>
            {/* Modal */}
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent>
                <DialogHeader>
                
                  <DialogTitle>Request Custom Marketing Asset</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    name="name"
                    placeholder="Your Name"
                    value={request.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={request.email}
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="details"
                    placeholder="Describe your custom asset needs..."
                    value={request.details}
                    onChange={handleChange}
                    required
                  />
                  <DialogFooter>
                  <div className="flex items-center w-full">
                  <img
                    src="/lovable-uploads/img/logo/updatedlogo1.png"
                    alt="Professional AI Assistants"
                    className="h-10 mr-3"
                    style={{ marginLeft: 0 }}
                  />
                  </div>
                    <Button type="submit" className="bg-[#1A237E]">Submit Request</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="banners" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="banners">Banners</TabsTrigger>
              <TabsTrigger value="email">Email Templates</TabsTrigger>
              <TabsTrigger value="video">Videos</TabsTrigger>
              <TabsTrigger value="social">Social Captions</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  if (activeTab === "banners") downloadAllImagesAsZip();
                  else if (activeTab === "video") downloadAllVideos();
                  else if (activeTab === "email") downloadAllEmailTemplates();
                  else if (activeTab === "social") downloadAllSocialCaptions();
                }}
              >
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
                    {video.previewUrl ? (
                      <>
                        {/* Only render iframe if this video is NOT open in the modal */}
                        {!(videoModal.open && videoModal.url === video.previewUrl) && (
                          <iframe
                            src={video.previewUrl}
                            allow="autoplay"
                            allowFullScreen
                            style={{ width: "100%", height: "100%" }}
                          />
                        )}
                        <button
                          type="button"
                          className="absolute top-2 right-2 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition"
                          title="Preview Video"
                          onClick={() => setVideoModal({ open: true, url: video.previewUrl, name: video.name })}
                        >
                          <Eye className="h-5 w-5 text-[#1A237E]" />
                        </button>
                      </>
                    ) : null}
                  </div>
                  <CardContent className="p-4">
                      <h3 className="font-medium mb-1">{video.name}</h3>
                      <div className="flex justify-between text-sm text-gray-500 mb-3">
                        <span>{video.type}</span>
                        <span>{video.downloads} downloads</span>
                      </div>
                      <Button size="sm" className="w-full" asChild>
                        <a
                          href={video.previewUrl.replace("/preview", "?export=download")}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="h-4 w-4 mr-1" /> Download
                        </a>
                      </Button>
                    </CardContent>
                </Card>
              ))}
            </div>
            {/* Video Modal */}
            <Dialog open={videoModal.open} onOpenChange={open => setVideoModal(v => ({ ...v, open }))}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{videoModal.name}</DialogTitle>
                </DialogHeader>
                <div className="w-full aspect-video">
                  <iframe
                    src={videoModal.url}
                    allow="autoplay"
                    allowFullScreen
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
              </DialogContent>
            </Dialog>
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
