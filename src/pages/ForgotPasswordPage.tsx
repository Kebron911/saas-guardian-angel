import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Link } from "react-router-dom";

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would trigger your password reset logic (API call, etc)
    setSubmitted(true);
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
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card py-8 px-4 shadow-lg rounded-lg sm:px-10 border border-border">
          {submitted ? (
            <div className="text-center text-green-600 font-medium">
              If an account with that email exists, a password reset link has been sent.
            </div>
          ) : (
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
              <Button
                type="submit"
                className="w-full bg-[#1A237E] hover:bg-[#151B60] dark:bg-[#3F51B5] dark:hover:bg-[#303F9F] text-white font-bold py-2 px-4"
              >
                Send Reset Link
              </Button>
            </form>
          )}
          <div className="mt-6 text-center">
            <a
              href="/login"
              className="text-[#00B8D4] hover:text-[#0097A7] font-medium"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;