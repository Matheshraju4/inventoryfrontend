import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader, Package } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";

interface Products {
  id: number;
  ShopifyId: string;
  WooCommerceId: any;
  image: string;
  stockQuantity: string;
  name: string;
  price: string;
  shortDescription: any;
  description: string;
  sku: any;
  platform: string[];
}

export function ProductCard({ productdata }: { productdata: Products[] }) {
  const [stockQuantity, setstockQuantity] = useState(0);
  const [loading, setloading] = useState(false);
  async function UpdateProduct(id: number) {
    // Define the product details object
    let data = JSON.stringify({
      productDetails: {
        id: id,
        stockQuantity: stockQuantity.toString(),
      },
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/both/updateproduct",
      headers: {
        accesstoken: localStorage.getItem("AccessToken"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      // Make the axios request and await the response
      const response = await axios.request(config);
      console.log("Product updated successfully:", response.data);
      if (response.data.process == true) {
        setloading(false);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  }

  return (
    <div className="grid grid-cols-3 ">
      {productdata.map((product) => (
        <Card className=" m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-primary bg-white shadow-md ">
          <a
            className=" mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            <img
              className="object-cover"
              src={product.image}
              alt="product image"
            />
          </a>
          <CardHeader>
            <CardTitle>{product?.name}</CardTitle>
            <CardDescription>{product.shortDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-row gap-2 items-center justify-between text-md">
              <div>
                <Package />
                <h1 className="font-bold">
                  Stock Quantity: {product.stockQuantity}
                </h1>
              </div>
              <Dialog>
                <DialogTrigger>
                  <Button type="submit" className="justify-end">
                    Edit
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Your stockQuantity</DialogTitle>
                    <DialogDescription>
                      <div className="space-y-2">
                        <Label htmlFor="stockQuantity"></Label>
                        <Input
                          id="stockQuantity"
                          name="stockQuantity"
                          type="number"
                          placeholder={product.stockQuantity}
                          step="0"
                          min="0"
                          onChange={(e) => {
                            setstockQuantity(Number(e.target.value));
                          }}
                          required
                        />
                        <Button
                          type="submit"
                          onClick={() => {
                            UpdateProduct(product.id);
                            setloading(true);
                          }}
                        >
                          {loading ? (
                            <Loader className="animate-spin" />
                          ) : (
                            <> update</>
                          )}
                        </Button>
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
