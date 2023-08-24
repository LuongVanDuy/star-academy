import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CreateResponse, DeleteResponse, DetailResponse, ListResponse, UpdateResponse } from "@/types/response";
import { User } from "@/types/user";
import { Timestamp } from "firebase/firestore";

const userCollection = collection(db, "users");

export const createUser = (data: User): Promise<CreateResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START createUser ---------");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const uid = user.uid; 

      await setDoc(doc(userCollection, uid), {
        id: uid, 
        email: data.email,
        name: data.name,
        phone: data.phone,
        type: data.type,
        address: data.address,
        unit_id: data.unit_id,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });

      console.log("-------- END createUser WITH NO ERRORS ---------");
      resolve({
        success: true,
        id: uid,
      } as CreateResponse);
    } catch (error) {
      console.log("-------- END createUser WITH ERROR ---------");
      reject({
        success: false,
        error: true,
        message: (error as Error).message,
      } as CreateResponse);
    }
  });
};

export const fetchUsers = async (option: string): Promise<ListResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchUsers ---------");
    try {
      const users: User[] = [];
      const q = query(userCollection, where("type", "==", option));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const user = doc.data() as User;
        user.id = doc.id;
        users.push(user);
      });

      console.log("-------- END fetchUsers WITH NO ERRORS ---------");
      resolve({
        data: users,
        total: users.length,
      } as ListResponse);
    } catch (error) {
      console.log("-------- END fetchUsers WITH ERRORS ---------");
      reject({
        data: [],
        total: 0,
        error: true,
        message: (error as Error).message,
      } as ListResponse);
    }
  });
};

export const fetchUser = async (id: string): Promise<DetailResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchUser ---------");
    try {
      const docSnap = await getDoc(doc(userCollection, id));

      if (docSnap.exists()) {
        const user = docSnap.data() as User;
        user.id = docSnap.id;

        console.log("-------- END fetchUser WITH NO ERRORS ---------");
        resolve({
          data: user as User,
        });
      } else {
        console.log("-------- END fetchUser WITH NO ERRORS ---------");
        resolve({
          data: {} as User,
        });
      }
    } catch (error) {
      console.log("-------- END fetchUser WITH ERRORS ---------");
      reject({
        data: {} as User,
        error: true,
        message: (error as Error).message,
      } as DetailResponse);
    }
  });
};

export const updateUser = async (data: User): Promise<UpdateResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!data.id) {
      reject({
        success: false,
        error: true,
        message: "No data found",
      } as UpdateResponse);
      return;
    }
    console.log("-------- START updateUser ---------");
    try {
      const userDoc = doc(userCollection, data.id);
      await updateDoc(userDoc, {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address,
        unit_id: data.unit_id,
        updated_at: Timestamp.now(),
      });
      console.log("-------- END updateUser WITH NO ERRORS ---------");
      resolve({
        success: true,
        id: data.id,
      } as UpdateResponse);
    } catch (error) {
      console.log("-------- END updateUser WITH ERROR ---------");
      reject({
        success: false,
        error: true,
        message: (error as Error).message,
      } as UpdateResponse);
    }
  });
};

export const deleteUser = async (id: string): Promise<DeleteResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!id) {
      reject({
        success: false,
        error: true,
        message: "No data found",
      } as DeleteResponse);
      return;
    }
    console.log("-------- START deleteUser ---------");
    try {
      await deleteDoc(doc(userCollection, id));
      
      console.log("-------- END deleteUser WITH NO ERRORS ---------");
      resolve({
        success: true,
        id: id,
      } as DeleteResponse);
    } catch (error) {
      console.log("-------- END deleteUser WITH ERROR ---------");
      reject({
        success: false,
        error: true,
        message: (error as Error).message,
      } as DeleteResponse);
    }
  });
};


