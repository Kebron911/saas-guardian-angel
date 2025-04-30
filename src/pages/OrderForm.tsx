
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useToast } from "@/hooks/use-toast";

const OrderForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [plan, setPlan] = useState<string>("starter");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    agree: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agree) {
      toast({
        title: "Error",
        description: "Please agree to the terms and conditions",
        variant: "destructive"
      });
      return;
    }

    // Simulate successful order
    toast({
      title: "Order Successful",
      description: "Thank you for your order! We'll be in touch shortly.",
    });

    // Navigate to login after a short delay
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-6xl">
        <div className="flex justify-center mb-6">
          <img
            src="/lovable-uploads/332ae568-86d8-4c46-ac45-7a8c67c76215.png"
            alt="Professional AI Assistants"
            className="h-16"
          />
        </div>
        
        <h1 className="text-3xl font-extrabold text-center mb-8 text-foreground">
          Get Started with Professional AI Assistants
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pricing Cards */}
          <Card className={`border-2 ${plan === "starter" ? "border-[#00B8D4]" : "border-border"} h-full`}>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>Perfect for small businesses</CardDescription>
              <div className="mt-4 text-3xl font-bold">$299<span className="text-lg font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> 24/7 AI Receptionist</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Up to 500 minutes/month</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Basic call analytics</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Email notifications</li>
              </ul>
            </CardContent>
            <CardFooter>
              <RadioGroupItem id="starter" value="starter" checked={plan === "starter"} onClick={() => setPlan("starter")} className="mr-2" />
              <Label htmlFor="starter">Select Starter</Label>
            </CardFooter>
          </Card>

          <Card className={`border-2 ${plan === "professional" ? "border-[#00B8D4]" : "border-border"} h-full`}>
            <CardHeader>
              <div className="px-3 py-1 text-xs bg-[#00B8D4] text-white rounded-full mb-2 inline-block">POPULAR</div>
              <CardTitle>Professional</CardTitle>
              <CardDescription>For growing businesses</CardDescription>
              <div className="mt-4 text-3xl font-bold">$599<span className="text-lg font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Everything in Starter</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Up to 1500 minutes/month</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Advanced call routing</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> SMS notifications</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Custom voice selection</li>
              </ul>
            </CardContent>
            <CardFooter>
              <RadioGroupItem id="professional" value="professional" checked={plan === "professional"} onClick={() => setPlan("professional")} className="mr-2" />
              <Label htmlFor="professional">Select Professional</Label>
            </CardFooter>
          </Card>

          <Card className={`border-2 ${plan === "enterprise" ? "border-[#00B8D4]" : "border-border"} h-full`}>
            <CardHeader>
              <CardTitle>Enterprise</CardTitle>
              <CardDescription>For organizations with complex needs</CardDescription>
              <div className="mt-4 text-3xl font-bold">$1,299<span className="text-lg font-normal">/month</span></div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4">
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Everything in Professional</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Unlimited minutes</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Premium voice options</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> API integration</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Custom script development</li>
                <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Dedicated support</li>
              </ul>
            </CardContent>
            <CardFooter>
              <RadioGroupItem id="enterprise" value="enterprise" checked={plan === "enterprise"} onClick={() => setPlan("enterprise")} className="mr-2" />
              <Label htmlFor="enterprise">Select Enterprise</Label>
            </CardFooter>
          </Card>
        </div>

        {/* Order Form */}
        <Card className="mt-10">
          <CardHeader>
            <CardTitle>Complete Your Order</CardTitle>
            <CardDescription>Please fill in your details to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email" 
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone"
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="company">Company Name</Label>
                  <Input 
                    id="company"
                    name="company" 
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label>Selected Plan</Label>
                  <Select value={plan} onValueChange={setPlan}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select a plan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter - $299/month</SelectItem>
                      <SelectItem value="professional">Professional - $599/month</SelectItem>
                      <SelectItem value="enterprise">Enterprise - $1,299/month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="terms" 
                  checked={formData.agree} 
                  onCheckedChange={(checked) => setFormData({...formData, agree: checked === true})}
                />
                <label 
                  htmlFor="terms" 
                  className="text-sm text-muted-foreground"
                >
                  I agree to the <a href="#" className="text-[#00B8D4] hover:underline">Terms of Service</a> and <a href="#" className="text-[#00B8D4] hover:underline">Privacy Policy</a>
                </label>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[#1A237E] hover:bg-[#151B60] text-white font-bold py-3"
              >
                Complete Your Order
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Need help? <a href="#" className="text-[#00B8D4] hover:underline">Contact our sales team</a> or call us at (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
