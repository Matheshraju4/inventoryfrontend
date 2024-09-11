"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ToastAction } from "@/components/ui/toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function Component() {
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shopifyAccessToken, setShopifyAccessToken] = useState("");
  const [shopifyShopName, setShopifyShopName] = useState("");

  const handleSave = () => {
    if (!shopifyAccessToken || !shopifyShopName) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically save the data to your backend
    console.log("Saving:", { shopifyAccessToken, shopifyShopName });

    setIsEditing(false);
    setIsVisible(false);
    toast({
      title: "Settings saved",
      description: "Your Shopify credentials have been updated.",
      action: <ToastAction altText="Okay">Okay</ToastAction>,
    });
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Shopify Settings</CardTitle>
        <CardDescription>Manage your Shopify credentials here.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shopifyAccessToken">Shopify Access Token</Label>
          <div className="relative">
            <Input
              id="shopifyAccessToken"
              value={shopifyAccessToken}
              onChange={(e) => setShopifyAccessToken(e.target.value)}
              disabled={!isEditing}
              type={isEditing || isVisible ? "text" : "password"}
              placeholder={
                isEditing ? "Enter your Shopify Access Token" : "••••••••"
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="shopifyShopName">Shopify Shop Name</Label>
          <Input
            id="shopifyShopName"
            value={shopifyShopName}
            onChange={(e) => setShopifyShopName(e.target.value)}
            disabled={!isEditing}
            type={isEditing || isVisible ? "text" : "password"}
            placeholder={
              isEditing ? "Enter your Shopify Shop Name" : "••••••••"
            }
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isEditing && (
          <Button
            variant="outline"
            onClick={toggleVisibility}
            aria-label={isVisible ? "Hide credentials" : "View credentials"}
          >
            {isVisible ? (
              <EyeOffIcon className="mr-2 h-4 w-4" />
            ) : (
              <EyeIcon className="mr-2 h-4 w-4" />
            )}
            {isVisible ? "Hide Credentials" : "View Credentials"}
          </Button>
        )}
        <div className="space-x-2">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={() => {
                  setIsEditing(false);
                  setIsVisible(false);
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
