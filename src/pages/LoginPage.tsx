import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { setRole, checkUserRole } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Validate email format
    const predefinedUsers = {
      "user@example.com": { role: "user", route: "/dashboard" },
      "admin@example.com": { role: "admin", route: "/admin" },
      "affiliate@example.com": { role: "affiliate", route: "/affiliate" },
    };

    try {
      // Check if the email matches one of our predefined users
      if (Object.keys(predefinedUsers).includes(email)) {
        // Set the role based on the email
        const userInfo = predefinedUsers[email as keyof typeof predefinedUsers];
        const userRole = userInfo.role as "user" | "admin" | "affiliate";
        const userRoute = userInfo.route;
        
        setRole(userRole);
        
        toast({
          title: "Login successful",
          description: `Logged in as ${userRole}`,
        });
        
        // Navigate to the appropriate dashboard
        navigate(userRoute);
      } else {
        toast({
          title: "Login failed",
          description: "Invalid credentials. Try user@example.com, admin@example.com, or affiliate@example.com",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Login error",
        description: "An error occurred while logging in",
        variant: "destructive"
      });
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex items-center font-bold text-[24px] text-[#1A237E] mb-3 md:mb-0 justify-center">
                      <img src="/lovable-uploads/img/logo/updatedlogo1.png" 
                        alt="Professional AI Assistants" 
                        className="h-10 mr-3 " style={{ width: 'auto', height: '3.5rem' }}
                      />
                    </Link>
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
              <div className="mt-1 text-xs text-muted-foreground">
                Try: user@example.com, admin@example.com, or affiliate@example.com
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
              <div className="mt-1 text-xs text-muted-foreground">
                Any password will work for demonstration purposes
              </div>
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
                  href="/forgot-password"
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
                disabled={isLoading}
              >
                {isLoading ? "LOGGING IN..." : "LOG IN"}
              </Button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="flex justify-center text-sm">
                <span className="px-2 text-muted-foreground">
                  Don't have an account?{" "}
                  <a
                    href="/order"
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
          <a href="/privacy-policy" className="hover:text-foreground">
            Privacy Policy
          </a>{" "}
          |{" "}
          <a href="/terms-of-service" className="hover:text-foreground">
            Terms of Use
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
