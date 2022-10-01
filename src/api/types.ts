import { Timestamp } from "firebase/firestore";

export interface UserType {
  name: string;
  avatar?: string;
  isOnline: boolean;
  uid: string;
  createdAt: Timestamp;
}

export interface ChatType {
  createdAt: Timestamp;
  file?: string;
  from: string;
  text: string;
  to: string;
}
