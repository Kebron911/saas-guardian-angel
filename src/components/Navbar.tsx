
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="flex items-center justify-between py-6 px-4 lg:px-0 max-w-5xl mx-auto">
    <div className="flex items-center space-x-2">
      <span className="text-2xl font-extrabold text-purple-600 tracking-tight">AssistAI</span>
    </div>
    <div className="flex items-center space-x-4">
      <a href="#features" className="text-gray-700 hover:text-violet-600 font-medium transition-colors">Features</a>
      <a href="#pricing" className="text-gray-700 hover:text-violet-600 font-medium transition-colors">Pricing</a>
      <Button asChild>
        <a href="#get-started" className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow">Get Started</a>
      </Button>
    </div>
  </nav>
);

export default Navbar;
