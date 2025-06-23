
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { CheckIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const OrderForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("starter");
  
  const [formData, setFormData] = useState({
    businessName: "",
    industry: "",
    plan: "starter",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$299",
      description: "Perfect for small businesses.",
      features: [
        "24/7 AI Receptionist",
        "Up to 500 minutes/month",
        "Basic call analytics",
        "Email notifications"
      ]
    },
    {
      id: "professional",
      name: "Professional",
      price: "$599",
      description: "For growing businesses.",
      features: [
        "Everything in Starter",
        "Up to 1500 minutes/month",
        "Advanced call routing",
        "SMS notifications",
        "Custom voice selection"
      ]
    },
    {
      id: "enterprise",
      name: "Enterprise",
      price: "$1,299",
      description: "For organizations with complex needs.",
      features: [
        "Everything in Professional",
        "Unlimited minutes",
        "Premium voice options",
        "API integration",
        "Custom script development",
        "Dedicated support"
      ]
    }
  ];
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    setFormData(prev => ({ ...prev, plan: planId }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Insert order into Supabase
      const { data, error } = await supabase
        .from('orders')
        .insert([
          {
            user_id: user?.id, // Add user_id if user is logged in
            business_name: formData.businessName,
            industry: formData.industry,
            plan: formData.plan,
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            phone: formData.phone
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Order Submitted Successfully",
        description: "We'll contact you shortly to complete your setup.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error Submitting Order",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <PageHeader />
      
      <main className="pt-[140px] pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Get Your AI Receptionist
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-10">
            Select your plan and complete the form below to get started with your AI receptionist solution.
          </p>
          
          {/* Pricing Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-center mb-8">Get Started with Professional AI Assistants</h2>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {plans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`flex-1 bg-white dark:bg-gray-800 border rounded-lg shadow-md p-6 flex flex-col mb-4 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                    selectedPlan === plan.id
                      ? "border-[#00B8D4] ring-2 ring-[#00B8D4]/30 dark:ring-[#00B8D4]/50"
                      : "border-gray-200 dark:border-gray-700"
                  } ${
                    plan.id === "professional" 
                      ? "relative overflow-hidden"
                      : ""
                  }`}
                >
                  {plan.id === "professional" && (
                    <div className="absolute -right-8 top-5 bg-purple-600 text-white text-xs py-1 px-8 transform rotate-45 font-bold">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{plan.description}</p>
                  <div className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">{plan.price}<span className="text-base font-normal text-gray-500 dark:text-gray-400">/month</span></div>
                  <ul className="mb-6 space-y-2 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="text-sm flex items-start">
                        <CheckIcon className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`w-full transition-all ${
                      selectedPlan === plan.id 
                        ? "bg-[#00B8D4] hover:bg-[#009cb8]" 
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {selectedPlan === plan.id ? "Selected" : `Select ${plan.name}`}
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Order</CardTitle>
              <CardDescription>Fill out your information to complete your order</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Business Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Business Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <Label htmlFor="businessName">Business Name</Label>
                          <Input 
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Your Business Name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="industry">Industry</Label>
                        <Select 
                          value={formData.industry} 
                          onValueChange={(value) => handleSelectChange("industry", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="professional">Professional Services</SelectItem>
                            <SelectItem value="hospitality">Hospitality</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Contact Information */}
                  <div>
                    <h3 className="text-lg font-medium mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input 
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input 
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(123) 456-7890"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t dark:border-gray-700">
                  <Button type="submit" className="w-full bg-[#00B8D4] hover:bg-[#009cb8]" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : `Complete Order (${formData.plan.charAt(0).toUpperCase() + formData.plan.slice(1)} Plan)`}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start text-sm text-gray-500 dark:text-gray-400">
              <p>By submitting this form, you agree to our Terms of Service and Privacy Policy.</p>
              <p className="mt-2">Need help? Contact our sales team at sales@example.com</p>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default OrderForm;
