import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  UserIcon,
  KeyIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  Loader,
  Trees,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthForms() {
  const [activeTab, setActiveTab] = useState("signup");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmitsignup = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    // Access form data correctly
    const formData = new FormData(event.target as HTMLFormElement);
    const name = formData.get("signup-name");
    const email = formData.get("signup-email");
    const password = formData.get("signup-password");

    let data = JSON.stringify({
      username: name,
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/createUser",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    if (response.data.message == "User created successfully") {
      setIsLoading(false);
    }
  };

  const handleSubmitSignin = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    // Access form data correctly
    const formData = new FormData(event.target as HTMLFormElement);
    const email = formData.get("signin-email");
    const password = formData.get("signin-password");

    let data = JSON.stringify({
      email: email,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios.request(config);
    if (response.data.process == true) {
      const accessToken = response.data.accessToken;
      localStorage.setItem("AccessToken", accessToken);
      window.location.reload();
      setIsLoading(false);
    }
  };

  return (
    <div className=" max-w-md space-y-6 border border-primary  bg-primary-foreground dark:bg-gray-800 p-8 rounded-xl shadow-lg">
      <div className="space-y-2 text-center">
        <Trees className="mx-auto h-12 w-12 text-primary" />
        <h1 className="text-3xl font-bold">Welcome to Our Platform</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Sign up or sign in to continue
        </p>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full border-foreground/50"
      >
        <TabsList className="grid w-full grid-cols-2 mb-8 ">
          <TabsTrigger value="signup" className="text-lg py-3 bg-slate-200">
            Sign Up
          </TabsTrigger>
          <TabsTrigger value="signin" className="text-lg py-3 bg-slate-200">
            Sign In
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <form onSubmit={handleSubmitsignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name" className="text-sm font-medium">
                Name
              </Label>
              <div className="relative">
                <UserIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="signup-name"
                  name="signup-name" // Added name attribute
                  placeholder="John Doe"
                  required
                  className="pl-10 border-foreground/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="signup-email"
                  name="signup-email" // Added name attribute
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="pl-10 border-foreground/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="signup-password"
                  name="signup-password" // Added name attribute
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 pr-10 border-foreground/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </TabsContent>
        <TabsContent value="signin">
          <form onSubmit={handleSubmitSignin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signin-email" className="text-sm font-medium">
                Email
              </Label>
              <div className="relative">
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="signin-email"
                  name="signin-email" // Added name attribute
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="signin-password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <KeyIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="signin-password"
                  name="signin-password" // Added name attribute
                  type={showPassword ? "text" : "password"}
                  required
                  className="pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <Label htmlFor="remember" className="text-sm font-medium">
                  Remember me
                </Label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>
            <Button
              type="submit"
              className="w-full text-lg py-6"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
