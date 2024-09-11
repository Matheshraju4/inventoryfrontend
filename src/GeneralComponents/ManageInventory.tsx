import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "./InnerComponents/ProductCard";
import { Loader2 } from "lucide-react";

let config = {
  method: "get",
  maxBodyLength: Infinity,
  url: "http://localhost:3000/getAllproducts",
  headers: {
    accesstoken: localStorage.getItem("AccessToken"),
  },
};
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
export default function ManageInventory() {
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
    <>
      {productdata ? (
        <ProductCard productdata={productdata} />
      ) : (
        <Loader2 className="animate-spin" />
      )}
    </>
  );
}
