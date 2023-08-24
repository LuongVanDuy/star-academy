import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CreateResponse, DetailResponse, ListResponse, UpdateResponse } from "@/types/response";
import { Timestamp } from "firebase/firestore";
import { Unit } from "@/types/unit";
import { FileWithOrigin, uploadImageAndGetURL } from "./storage";

const unitCollection = collection(db, "units");

export const createUnit = async (data: Unit): Promise<CreateResponse> => {
  console.log("-------- START createUnit ---------");

  try {
    
    const file: FileWithOrigin = data.image?.file.originFileObj; 
    const downloadURL = await uploadImageAndGetURL(file);

    const unitData = {
      name: data.name,
      image: downloadURL,
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const createUnitResult = await addDoc(unitCollection, unitData);

    console.log("-------- END createUnit WITH NO ERRORS ---------");
    return {
      success: true,
      id: createUnitResult.id,
    };
  } catch (error) {
    console.log("-------- END createUnit WITH ERROR ---------");
    throw {
      success: false,
      error: true,
      message: (error as Error).message,
    };
  }
};

export const fetchUnitsActive = async (unitIds: string[]): Promise<ListResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchUnitsActive ---------");
    try {
      const units: Unit[] = [];
      const q = query(unitCollection);
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const unit = doc.data() as Unit;
        unit.id = doc.id;
        if (unitIds.includes(unit.id)) {
          units.push(unit);
        }
      });
      
      console.log("-------- END fetchUnitsActive WITH NO ERRORS ---------");
      resolve({
        data: units,
        total: units.length,
      } as ListResponse);
    } catch (error) {
      console.log("-------- END fetchUnitsActive WITH ERRORS ---------");
      reject({
        data: [],
        total: 0,
        error: true,
        message: (error as Error).message,
      } as ListResponse);
    }
  })
};

export const fetchUnits = async (): Promise<ListResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchUnits ---------");
    try {
      const units: Unit[] = [];
      const q = query(unitCollection);
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const unit = doc.data() as Unit;
        unit.id = doc.id;
        units.push(unit);
      });

      console.log("-------- END fetchUnits WITH NO ERRORS ---------");
      resolve({
        data: units,
        total: units.length,
      } as ListResponse);
    } catch (error) {
      console.log("-------- END fetchUnits WITH ERRORS ---------");
      reject({
        data: [],
        total: 0,
        error: true,
        message: (error as Error).message,
      } as ListResponse);
    }
  });
};

export const fetchUnit = async (id: string): Promise<DetailResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchUnit ---------");
    try {
      const docSnap = await getDoc(doc(unitCollection, id));

      if (docSnap.exists()) {
        const unit = docSnap.data() as Unit;
        unit.id = docSnap.id;

        console.log("-------- END fetchUnit WITH NO ERRORS ---------");
        resolve({
          data: unit,
        });
      } else {
        console.log("-------- END fetchUnit WITH NO ERRORS ---------");
        resolve({
          data: {},
        });
      }
    } catch (error) {
      console.log("-------- END fetchUnit WITH ERRORS ---------");
      reject({
        data: {},
        error: true,
        message: (error as Error).message,
      } as DetailResponse);
    }
  });
};

export const updateUnit = async (data: Unit): Promise<UpdateResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!data.id) {
      reject({
        success: false,
        error: true,
        message: "No data found",
      } as UpdateResponse);
      return;
    }
    console.log("-------- START updateUnit ---------");
    try {
      
      const file = data.image?.file?.originFileObj; 
    
      let downloadURL = data.image?.url;
      
      if (file && !downloadURL) {
        downloadURL = await uploadImageAndGetURL(file);
      }
      
      const unitDoc = doc(unitCollection, data.id);
      await updateDoc(unitDoc, {
        name: data.name,
        image: downloadURL,
        updated_at: Timestamp.now(),
      });
      console.log("-------- END updateUnit WITH NO ERRORS ---------");
      resolve({
        success: true,
        id: data.id,
      } as UpdateResponse);
    } catch (error) {
      console.log("-------- END updateUnit WITH ERROR ---------");
      reject({
        success: false,
        error: true,
        message: (error as Error).message,
      } as UpdateResponse);
    }
  });
};

