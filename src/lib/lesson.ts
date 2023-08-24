import { addDoc, collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "@/config/firebase";
import { CreateResponse, DetailResponse, ListResponse, UpdateResponse } from "@/types/response";
import { Timestamp } from "firebase/firestore";
import { FileWithOrigin, uploadImageAndGetURL, uploadVideoAndGetURL } from "./storage";
import { Lesson } from "@/types/lesson";

const lessonCollection = collection(db, "lessons");

export const createLesson = async (data: Lesson): Promise<CreateResponse> => {
  console.log("-------- START createLesson ---------");
  try {
    const file: FileWithOrigin = data.image?.file.originFileObj; 
    const downloadURL = await uploadImageAndGetURL(file);

    if (!downloadURL) {
      throw new Error("Failed to upload image.");
    }
    
    const fileVideo: FileWithOrigin = data.video?.file.originFileObj; 
    const downloadURLVideo = await uploadVideoAndGetURL(fileVideo);

    if (!downloadURLVideo) {
      throw new Error("Failed to upload video.");
    }

    const lessonData = {
      name: data.name,
      unit_id: data.unit_id,
      image: downloadURL,
      video: downloadURLVideo,
      
      created_at: Timestamp.now(),
      updated_at: Timestamp.now(),
    };

    const createLessonResult = await addDoc(lessonCollection, lessonData);

    console.log("-------- END createLesson WITH NO ERRORS ---------");
    return {
      success: true,
      id: createLessonResult.id,
    };
  } catch (error) {
    console.log("-------- END createLesson WITH ERROR ---------");
    throw {
      success: false,
      error: true,
      message: (error as Error).message,
    };
  }
};

export const fetchLessons = async (option: string): Promise<ListResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchLessons ---------");
    try {
      const lessons: Lesson[] = [];
      const q = query(lessonCollection, where("unit_id", "==", option));
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        const lesson = doc.data() as Lesson;
        lesson.id = doc.id;
        lessons.push(lesson);
      });

      console.log("-------- END fetchLessons WITH NO ERRORS ---------");
      resolve({
        data: lessons,
        total: lessons.length,
      } as ListResponse);
    } catch (error) {
      console.log("-------- END fetchLessons WITH ERRORS ---------");
      reject({
        data: [],
        total: 0,
        error: true,
        message: (error as Error).message,
      } as ListResponse);
    }
  });
};

export const fetchLesson = async (id: string): Promise<DetailResponse> => {
  return new Promise(async (resolve, reject) => {
    console.log("-------- START fetchLesson ---------");
    try {
      const docSnap = await getDoc(doc(lessonCollection, id));

      if (docSnap.exists()) {
        const lesson = docSnap.data() as Lesson;
        lesson.id = docSnap.id;

        console.log("-------- END fetchLesson WITH NO ERRORS ---------");
        resolve({
          data: lesson,
        });
      } else {
        console.log("-------- END fetchLesson WITH NO ERRORS ---------");
        resolve({
          data: {},
        });
      }
    } catch (error) {
      console.log("-------- END fetchLesson WITH ERRORS ---------");
      reject({
        data: {},
        error: true,
        message: (error as Error).message,
      } as DetailResponse);
    }
  });
};

export const updateLesson = async (data: Lesson): Promise<UpdateResponse> => {
  return new Promise(async (resolve, reject) => {
    if (!data.id) {
      reject({
        success: false,
        error: true,
        message: "No data found",
      } as UpdateResponse);
      return;
    }
    console.log("-------- START updateLesson ---------");
    try {
      
      const file = data.image?.file?.originFileObj; 
    
      let downloadURL = data.image?.url;
      
      if (file && !downloadURL) {
        downloadURL = await uploadImageAndGetURL(file);
        if (!downloadURL) {
          throw new Error("Failed to upload image.");
        }
      }
      
      const fileVideo = data.video?.file?.originFileObj; 
    
      let downloadURLVideo = data.video?.url;
      
      if (fileVideo && !downloadURLVideo) {
        downloadURLVideo = await uploadVideoAndGetURL(fileVideo);
        if (!downloadURLVideo) {
          throw new Error("Failed to upload video.");
        }
      }
      
      const lessonDoc = doc(lessonCollection, data.id);
      await updateDoc(lessonDoc, {
        name: data.name,
        image: downloadURL,
        video: downloadURLVideo,
        updated_at: Timestamp.now(),
      });
      console.log("-------- END updateLesson WITH NO ERRORS ---------");
      resolve({
        success: true,
        id: data.id,
      } as UpdateResponse);
    } catch (error) {
      console.log("-------- END updateLesson WITH ERROR ---------");
      reject({
        success: false,
        error: true,
        message: (error as Error).message,
      } as UpdateResponse);
    }
  });
};

