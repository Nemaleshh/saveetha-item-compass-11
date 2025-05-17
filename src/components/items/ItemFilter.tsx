
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ItemStatus, ItemType } from "@/types";
import { Search, X } from "lucide-react";

interface ItemFilterProps {
  onFilter: (filters: {
    search: string;
    status: ItemStatus | "all";
    type: ItemType | "all";
  }) => void;
}

export function ItemFilter({ onFilter }: ItemFilterProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ItemStatus | "all">("all");
  const [type, setType] = useState<ItemType | "all">("all");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({ search, status, type });
  };

  const handleReset = () => {
    setSearch("");
    setStatus("all");
    setType("all");
    onFilter({ search: "", status: "all", type: "all" });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-muted/20 rounded-lg border">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Search items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={status}
            onValueChange={(value) => setStatus(value as ItemStatus | "all")}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="lost">Lost</SelectItem>
              <SelectItem value="found">Found</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as ItemType | "all")}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2">
          <Button type="submit" className="flex-1">
            Filter
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="gap-1">
            <X className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </form>
  );
}
