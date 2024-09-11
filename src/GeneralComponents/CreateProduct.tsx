import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, Loader, Loader2, X } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { generateSKU } from "./InnerComponents/Generatesku";

export default function Component() {
  const [mainImageUrl, setMainImageUrl] = useState<string | null>();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImagesUrl, setGalleryImagesUrl] = useState<string[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const handleMainImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.split("/")[1];
      const storageRef = ref(storage, `images/${uuidv4()}.${fileType}`);

      // Start the file upload task
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Update progress
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle unsuccessful uploads
          console.error("Error uploading image:", error);
        },
        async () => {
          // Handle successful uploads on complete
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at", downloadURL);
          setMainImageUrl(downloadURL);
          // Set the image URL to display or use it later

          alert("File uploaded successfully!");
        }
      );

      const reader = new FileReader();

      reader.onloadend = () => {
        setMainImage(reader.result as string);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleGalleryImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const fileType = file.type.split("/")[1];
        console.log("fileType", fileType);
        const storageRef = ref(storage, `images/${uuidv4()}.${fileType}`);

        // Start the file upload task
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Update progress for individual image
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done for ${file.name}`);
          },
          (error) => {
            // Handle unsuccessful uploads
            console.error(`Error uploading ${file.name}:`, error);
          },
          async () => {
            // After upload is complete, get the download URL
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // Set the Firebase image URL to display the uploaded image
            setGalleryImages((prev) => [...prev, downloadURL]); // Update state with each upload

            // Also, add to galleryImagesUrl for final use
            setGalleryImagesUrl((prev) => [...prev, downloadURL]); // This is your full gallery state
            console.log(`${file.name} uploaded. Download URL: ${downloadURL}`);
          }
        );
      });

      // You do not need to wait for all uploads to complete in this case
      alert("Image uploads started. They will be added as they complete.");
    }
  };

  const removeGalleryImage = (index: number) => {
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags((prev) => [...prev, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (formRef.current) {
      // Create a FormData object from the form
      const formData = new FormData(formRef.current);

      // Example: Get form data
      const productName = formData.get("title");
      const shortDescription = formData.get("shortDescription");
      const description = formData.get("description");
      const regularPrice = formData.get("regularPrice");
      const salePrice = formData.get("salePrice");
      const stockQuantity = formData.get("stockQuantity");
      const Weight = formData.get("weight");

      // Ensure that productName and description are strings

      let data = {
        productDetails: {
          WooCommerceId: "",
          ShopifyId: "",
          platform: ["WooCommerce", "Shopify"],
          name: productName,
          description: description,
          shortDescription: shortDescription,
          status: "publish",
          sku: generateSKU(productName as string, description as string),
          featured: true,
          weight: Weight,
          image: mainImageUrl ? mainImageUrl : "",
          imageUrls: galleryImagesUrl ? galleryImagesUrl : [""],
          price: salePrice,
          regularPrice: regularPrice,
          salePrice: salePrice,
          onSale: true,
          purchasable: true,
          manageStock: true,
          stockQuantity: stockQuantity,
        },
      };
      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:3000/both/createproduct",
        headers: {
          "Content-Type": "application/json",
          accesstoken: localStorage.getItem("AccessToken"),
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log("Response from server", response.data);
    }

    // Here you would typically send the form data to your backend
    setLoading(false);
    alert("Product created successfully!");
  };

  return (
    <div className="w-full p-4">
      <Card className="w-full  mx-auto bg-slate-50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create a New Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter product title"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="shortDescription">Short Description</Label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  placeholder="Enter short description"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Full Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Enter full product description"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="stockQuantity">stockQuantity</Label>
                <Input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  placeholder="0"
                  step="0"
                  min="0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="salePrice">Sale Price</Label>
                <Input
                  id="salePrice"
                  name="salePrice"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Shipping Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="mainImage">Main Product Image</Label>
              <div className="flex items-center space-x-4">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                  {mainImage ? (
                    <img
                      src={mainImage}
                      alt="Main product"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ImagePlus className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <Input
                  id="mainImage"
                  name="mainImage"
                  type="file"
                  accept="image/*"
                  onChange={handleMainImageUpload}
                  className="max-w-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="galleryImages">Gallery Images</Label>
              <Input
                id="galleryImages"
                name="galleryImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleGalleryImageUpload}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {galleryImages.map((img, index) => (
                  <div key={index} className="relative w-20 h-20">
                    <img
                      src={img}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-full object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch id="status" name="status" />
              <Label htmlFor="status">Active</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Product Tags</Label>
              <div className="flex space-x-2">
                <Input
                  id="tags"
                  name="tags"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                />
                <Button type="button" onClick={addTag}>
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-blue-800"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mx-auto max-w-xl py-4">
              <Button type="submit" className="w-full ">
                {loading ? (
                  <Loader2 className="size-7 animate-spin" />
                ) : (
                  <>Create Product</>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
