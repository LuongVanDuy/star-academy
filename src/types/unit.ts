import { Timestamp } from "firebase/firestore";

export type Unit = {
  id: string;
  name: string;
  image: any;
  
  created_at?: Timestamp;
  updated_at?: Timestamp;
};

