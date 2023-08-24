import { Timestamp } from "firebase/firestore";

export type User = {
  id?: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
  phone: string;
  type: string;
  unit_id: string[];
  address?: string;
  created_at?: Timestamp;
  updated_at?: Timestamp;
};

export const UserType = {
  STUDENT: "STUDENT",
  SYSTEM: "SYSTEM"
}

