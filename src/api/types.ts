import { Timestamp } from "firebase/firestore";

export interface UserType {
  name: string;
  avatar?: string;
  isOnline: boolean;
  uid: string;
  createdAt: Timestamp;
}
