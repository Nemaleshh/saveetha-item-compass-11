
export type UserRole = "user" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type ItemStatus = "lost" | "found" | "completed";
export type ItemType = "normal" | "emergency";
export type ItemPlace = "lost" | "found";

export interface Item {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  productName: string;
  photo: string | null;
  place: ItemPlace;
  date: string;
  type: ItemType;
  status: ItemStatus;
  createdAt: string;
}
