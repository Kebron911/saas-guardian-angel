
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

const HeroSection = () => (
  <section className="pt-16 pb-20 bg-gradient-to-b from-purple-50 to-white">
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="flex items-center justify-center mb-3">
        <Sparkles size={32} className="text-purple-400" />
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-purple-600 via-violet-500 to-blue-500 bg-clip-text text-transparent mb-6">
        Build SaaS Faster with AssistAI
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        The all-in-one AI-first SaaS starter kit. Focus on your product, not the boilerplate.
      </p>
      <Button size="lg" className="bg-purple-600 hover:bg-purple-700" asChild>
        <a href="#get-started" id="get-started">Get Started for Free</a>
      </Button>
    </div>
  </section>
);

export default HeroSection;
