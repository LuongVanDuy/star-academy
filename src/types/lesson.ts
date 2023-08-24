import { Timestamp } from "firebase/firestore";

export type Lesson = {
  id?: string;
  unit_id: string;
  name: string;
  image: any;
  video: any;
  
  created_at?: Timestamp;
  updated_at?: Timestamp;
};

