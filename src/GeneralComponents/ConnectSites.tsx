"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ShoppingCart, Store, MoreHorizontal, Loader2 } from "lucide-react";
import axios from "axios";

export default function ConnectSites() {
  const [shopifyModalOpen, setShopifyModalOpen] = useState(false);
  const [wooCommerceModalOpen, setWooCommerceModalOpen] = useState(false);
  const [shopifySubmitloading, setshopifySubmitloading] = useState(false);
  const [WooCommerceSubmitLoading, setWooCommerceSubmitLoading] =
    useState(false);
  const [shopifyData, setShopifyData] = useState({
    accessToken: "",
    shopName: "",
  });
  const [wooCommerceData, setWooCommerceData] = useState({
    url: "",
    consumerSecret: "",
    consumerKey: "",
  });

  const handleShopifySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setshopifySubmitloading(true);
    let data = JSON.stringify({
      shopCred: {
        shopifyAccessToken: shopifyData.accessToken,
        shopifyShopName: shopifyData.shopName,
      },
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/connectShops",
      headers: {
        "Content-Type": "application/json",
        accesstoken: localStorage.getItem("AccessToken"),
      },
      data: data,
    };
    const response = await axios.request(config);

    if (response.data.message == "Credentials  Updated Successfully") {
      setshopifySubmitloading(false);
    }

    setShopifyModalOpen(false);
  };

  const handleWooCommerceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setWooCommerceSubmitLoading(true);
    let data = JSON.stringify({
      shopCred: {
        wooCommerceUrl: wooCommerceData.url,
        wooCommerceConsumerSecret: wooCommerceData.consumerSecret,
        wooCommerceConsumerKey: wooCommerceData.consumerKey,
        connectedWith: ["Shopify", "WooCommerce"],
      },
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/connectShops",
      headers: {
        "Content-Type": "application/json",
        accesstoken: localStorage.getItem("AccessToken"),
      },
      data: data,
    };
    const response = await axios.request(config);

    if (response.data.message == "Credentials  Updated Successfully") {
      setWooCommerceSubmitLoading(false);
    }
    setWooCommerceModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        Connect with your Ecommerce Platforms
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          className="cursor-pointer"
          onClick={() => setShopifyModalOpen(true)}
        >
          <CardHeader>
            <CardTitle>Shopify</CardTitle>
            <CardDescription>Connect your Shopify store</CardDescription>
          </CardHeader>
          <CardContent>
            <ShoppingCart className="w-12 h-12 mx-auto text-green-500" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Connect Shopify</Button>
          </CardFooter>
        </Card>

        <Card
          className="cursor-pointer"
          onClick={() => setWooCommerceModalOpen(true)}
        >
          <CardHeader>
            <CardTitle>WooCommerce</CardTitle>
            <CardDescription>Connect your WooCommerce store</CardDescription>
          </CardHeader>
          <CardContent>
            <Store className="w-12 h-12 mx-auto text-purple-500" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">Connect WooCommerce</Button>
          </CardFooter>
        </Card>

        <Card className="opacity-50 cursor-not-allowed">
          <CardHeader>
            <CardTitle>Others</CardTitle>
            <CardDescription>More platforms coming soon</CardDescription>
          </CardHeader>
          <CardContent>
            <MoreHorizontal className="w-12 h-12 mx-auto text-gray-500" />
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <Button className="w-full" disabled>
              Connect
            </Button>
            <Badge className="ml-2 bg-yellow-500">Coming Soon</Badge>
          </CardFooter>
        </Card>
      </div>

      <Dialog open={shopifyModalOpen} onOpenChange={setShopifyModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect Shopify</DialogTitle>
            <DialogDescription>
              Enter your Shopify store details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleShopifySubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shopifyAccessToken" className="text-right">
                  Access Token
                </Label>
                <Input
                  id="shopifyAccessToken"
                  value={shopifyData.accessToken}
                  onChange={(e) =>
                    setShopifyData({
                      ...shopifyData,
                      accessToken: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shopifyShopName" className="text-right">
                  Shop Name
                </Label>
                <Input
                  id="shopifyShopName"
                  value={shopifyData.shopName}
                  onChange={(e) =>
                    setShopifyData({ ...shopifyData, shopName: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {shopifySubmitloading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Connect Shopify</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={wooCommerceModalOpen}
        onOpenChange={setWooCommerceModalOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect WooCommerce</DialogTitle>
            <DialogDescription>
              Enter your WooCommerce store details below.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWooCommerceSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wooCommerceUrl" className="text-right">
                  URL
                </Label>
                <Input
                  id="wooCommerceUrl"
                  value={wooCommerceData.url}
                  onChange={(e) =>
                    setWooCommerceData({
                      ...wooCommerceData,
                      url: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="wooCommerceConsumerKey" className="text-right">
                  Consumer Key
                </Label>
                <Input
                  id="wooCommerceConsumerKey"
                  value={wooCommerceData.consumerKey}
                  onChange={(e) =>
                    setWooCommerceData({
                      ...wooCommerceData,
                      consumerKey: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="wooCommerceConsumerSecret"
                  className="text-right"
                >
                  Consumer Secret
                </Label>
                <Input
                  id="wooCommerceConsumerSecret"
                  value={wooCommerceData.consumerSecret}
                  onChange={(e) =>
                    setWooCommerceData({
                      ...wooCommerceData,
                      consumerSecret: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">
                {WooCommerceSubmitLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>Connect WooCommerce</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
