
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemPlace, ItemType, ItemStatus } from "@/types";
import { useData } from "@/context/data-context";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";

export function NewItemForm() {
  const { user } = useAuth();
  const { addItem } = useData();
  const navigate = useNavigate();
  
  const [productName, setProductName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [place, setPlace] = useState<ItemPlace>("lost");
  const [date, setDate] = useState("");
  const [type, setType] = useState<ItemType>("normal");
  const [status, setStatus] = useState<ItemStatus>("lost");
  const [photo, setPhoto] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("You must be logged in to report an item");
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await addItem({
        userName: user.name,
        userPhone,
        productName,
        photo,
        place,
        date: date || new Date().toISOString(),
        type,
        status,
      });
      
      toast.success("Item reported successfully");
      navigate("/");
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to report item");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock file upload with placeholder URLs
    const photoOptions = [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
      "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1"
    ];
    
    // Randomly select one of the placeholder images
    const randomIndex = Math.floor(Math.random() * photoOptions.length);
    setPhoto(photoOptions[randomIndex]);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Report Lost or Found Item</CardTitle>
        <CardDescription>Provide details about the item you lost or found</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="productName">Item Name</Label>
            <Input
              id="productName"
              placeholder="e.g., Water Bottle, Wallet, Keys"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="userPhone">Phone Number</Label>
            <Input
              id="userPhone"
              type="tel"
              placeholder="Your contact number"
              value={userPhone}
              onChange={(e) => setUserPhone(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="place">Report Type</Label>
            <RadioGroup
              value={place}
              onValueChange={(value) => {
                setPlace(value as ItemPlace);
                setStatus(value as ItemStatus); // Set status based on place
              }}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lost" id="lost" />
                <Label htmlFor="lost">Lost Item</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="found" id="found" />
                <Label htmlFor="found">Found Item</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Priority Level</Label>
            <RadioGroup
              value={type}
              onValueChange={(value) => setType(value as ItemType)}
              className="flex flex-col gap-2 sm:flex-row"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="normal" id="normal" />
                <Label htmlFor="normal">Normal</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="emergency" />
                <Label htmlFor="emergency" className="flex items-center gap-1">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  Emergency
                </Label>
              </div>
            </RadioGroup>
            {type === "emergency" && (
              <p className="text-xs text-muted-foreground">
                Mark as emergency if the item is valuable or urgently needed.
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="photo">Photo (optional)</Label>
            <Input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
            />
            {photo && (
              <div className="mt-2 relative aspect-[4/3] w-full max-w-md rounded-md overflow-hidden">
                <img
                  src={photo}
                  alt="Item preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Submitting..." : "Submit Report"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
