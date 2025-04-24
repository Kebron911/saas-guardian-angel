
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setRole } = useAuth();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [selectedRole, setSelectedRole] = React.useState<"user" | "admin" | "affiliate">("user");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Set the role in our auth context
    setRole(selectedRole);
    
    // Navigate to the appropriate dashboard
    if (selectedRole === "admin") {
      navigate("/admin");
    } else if (selectedRole === "affiliate") {
      navigate("/affiliate");
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img
            src="/lovable-uploads/332ae568-86d8-4c46-ac45-7a8c67c76215.png"
            alt="Professional AI Assistants"
            className="h-16"
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-foreground">
          Log in to your Account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-border">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email address</Label>
              <div className="mt-2">
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="mt-2 relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            {/* Role selection for testing */}
            <div className="border-t border-gray-200 pt-4">
              <Label className="mb-3 block">Login as:</Label>
              <RadioGroup 
                value={selectedRole} 
                onValueChange={(val: "user" | "admin" | "affiliate") => setSelectedRole(val)}
                className="flex flex-wrap space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">Regular User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="affiliate" id="affiliate" />
                  <Label htmlFor="affiliate">Affiliate</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox id="remember-me" />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-foreground"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-[#00B8D4] hover:text-[#0097A7] dark:text-[#4DD0E1] dark:hover:text-[#80DEEA]"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full bg-[#1A237E] hover:bg-[#151B60] dark:bg-[#3F51B5] dark:hover:bg-[#303F9F] text-white font-bold py-2 px-4"
              >
                LOG IN
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="flex justify-center text-sm">
                <span className="px-2 text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="#"
                    className="font-medium text-[#00B8D4] hover:text-[#0097A7] dark:text-[#4DD0E1] dark:hover:text-[#80DEEA]"
                  >
                    Join Now
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="#" className="hover:text-foreground">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
