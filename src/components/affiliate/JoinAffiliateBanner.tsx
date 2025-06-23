
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Users, Award, TrendingUp, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const JoinAffiliateBanner = ({ onApplySuccess }: { onApplySuccess: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  const handleApply = async () => {
    setIsSubmitting(true);
    
    // Simulate a network request
    setTimeout(() => {
      toast({
        title: "Application Submitted!",
        description: "We'll review your application and get back to you soon.",
      });
      setIsSubmitting(false);
      onApplySuccess();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-[#1A237E]/10 to-[#00B8D4]/10 dark:from-[#1A237E]/20 dark:to-[#00B8D4]/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Become an Affiliate Partner</CardTitle>
          <CardDescription>Earn recurring commissions by referring new customers to our platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Why Join Our Affiliate Program?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-green-500 dark:text-green-400">
                    <Check size={18} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Earn 20% commission on all direct referrals</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-green-500 dark:text-green-400">
                    <Check size={18} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Earn 10% on tier 2 referrals from your network</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-green-500 dark:text-green-400">
                    <Check size={18} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Monthly payouts with low minimum threshold</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-green-500 dark:text-green-400">
                    <Check size={18} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Access to marketing materials and promotional tools</p>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 text-green-500 dark:text-green-400">
                    <Check size={18} />
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">Real-time reporting and performance tracking</p>
                </li>
              </ul>
              
              <Button 
                onClick={handleApply} 
                className="mt-6 bg-[#1A237E] hover:bg-[#1A237E]/90 dark:bg-[#1A237E]/80 dark:hover:bg-[#1A237E]/70" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Apply to Join"}
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 h-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
                <TrendingUp size={32} className="text-[#1A237E] dark:text-[#00B8D4] mb-2" />
                <h4 className="font-medium">Earn Passive Income</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Get paid for every referral, month after month</p>
              </Card>
              
              <Card className="p-4 h-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
                <Users size={32} className="text-[#1A237E] dark:text-[#00B8D4] mb-2" />
                <h4 className="font-medium">Two-Tier Structure</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Earn from your network's referrals too</p>
              </Card>
              
              <Card className="p-4 h-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
                <Link size={32} className="text-[#1A237E] dark:text-[#00B8D4] mb-2" />
                <h4 className="font-medium">Easy Sharing</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Custom links and promotional tools</p>
              </Card>
              
              <Card className="p-4 h-full flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800">
                <Award size={32} className="text-[#1A237E] dark:text-[#00B8D4] mb-2" />
                <h4 className="font-medium">Exclusive Bonuses</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Special rewards for top performers</p>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Who can join the affiliate program?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Anyone with an active account can apply. We particularly welcome industry professionals, content creators, and influencers in relevant fields.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">How and when do I get paid?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Payments are processed monthly for all earnings that exceed the $100 minimum threshold. We support multiple payment methods including PayPal and direct bank transfers.</p>
            </div>
            <div>
              <h4 className="font-medium mb-1">How long does approval take?</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Applications are typically reviewed within 2-3 business days. You'll receive an email notification once approved.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JoinAffiliateBanner;
