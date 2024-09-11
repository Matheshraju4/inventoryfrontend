import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlarmCheck,
  AlertCircle,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  MoreHorizontal,
  Package,
  Search,
  UserCircle,
} from "lucide-react";

import axios from "axios";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:3000/getAllproducts",
  headers: {
    accesstoken: localStorage.getItem("AccessToken"),
  },
};

interface Products {
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
export default function InventoryDashboard() {
  const [productdata, setproductdata] = useState<Products[]>();

  const [lessStockitems, setlessstockitems] = useState(0);
  const [outofStock, setOutofStock] = useState(0);
  const totalItems = productdata?.length;
  useEffect(() => {
    async function fetchProducts() {
      try {
        const products = await axios.request(config);
        console.log("Received Products", products.data);

        // Set the product data
        const fetchedProducts = products.data.Products;
        setproductdata(fetchedProducts);

        // Calculate less stock items based on fetched data
        const lessStock = fetchedProducts.filter(
          (product: any) =>
            Number(product.stockQuantity) < 11 &&
            Number(product.stockQuantity) > 0
        ).length; // Count the number of items with low stock

        // Set the less stock items count
        setlessstockitems(lessStock);
        const zerostock = fetchedProducts.filter(
          (product: any) => Number(product.stockQuantity) == 0
        ).length;
        setOutofStock(zerostock);

        return fetchedProducts;
      } catch (error) {
        console.error("Error fetching products", error);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full  items-center">
      <main className=" p-4 md:p-6 w-full">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-200 border-primary bg-primary/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold  p-2  rounded-lg">
                Total Items
              </CardTitle>
              <Package className="size-10 rounded-full bg-primary text-primary-foreground p-2" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl pl-2 font-bold">{totalItems}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className="bg-slate-200 border-orange-500 bg-orange-500/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold  p-2  rounded-lg">
                Low Stock Items
              </CardTitle>
              <AlertCircle className="size-10 rounded-full bg-orange-500 text-destructive-foreground p-2" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl pl-2 font-bold">{lessStockitems}</div>
              <p className="text-xs text-muted-foreground">-4 from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-slate-200 border-destructive bg-destructive/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-xl font-bold  p-2  rounded-lg">
                Out of Stock
              </CardTitle>
              <AlarmCheck className="size-10 rounded-full bg-destructive text-destructive-foreground p-2" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl pl-2 font-bold ">{outofStock}</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
        </div>
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Inventory Items</CardTitle>
            <CardDescription>
              A list of all inventory items including their current stock levels
              and status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">SKU</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productdata?.map((product, index: number) => (
                  <TableRow
                    className={cn(
                      "p-0",
                      index % 2 === 0 ? "bg-slate-200/90 " : ""
                    )}
                  >
                    <TableCell className="font-medium p-3">
                      {product.sku ? product.sku : "DHS000 "}
                    </TableCell>
                    <TableCell className="p-3">{product.name}</TableCell>
                    <TableCell className="p-3">{product.platform[0]}</TableCell>
                    <TableCell className="text-right p-3">
                      {product.stockQuantity}
                    </TableCell>
                    <TableCell className="text-right p-3">
                      {product.price}
                    </TableCell>
                    <TableCell className=" flex justify-center items-center">
                      <Badge
                        className={cn({
                          "bg-primary text-primary-foreground":
                            Number(product.stockQuantity) > 11, // In Stock
                          "bg-destructive text-destructive-foreground":
                            Number(product.stockQuantity) === 0, // Out of Stock
                          "bg-orange-500 text-white":
                            Number(product.stockQuantity) > 0 &&
                            Number(product.stockQuantity) < 11, // Low Stock
                        })}
                      >
                        {Number(product.stockQuantity) === 0
                          ? "Out of Stock"
                          : Number(product.stockQuantity) < 11
                          ? "Low Stock"
                          : "In Stock"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right p-3">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button size="icon" variant="ghost">
                            <MoreHorizontal className="w-4 h-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
