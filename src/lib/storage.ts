import { storage } from "@/config/firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

export type FileWithOrigin = {
  uid: string;
  name: string;
  status: string;
  thumbUrl: string;
  originFileObj: File;
  url: string;
};

export const uploadImageAndGetURL = async (imageFile: any) => {
  const fileType = imageFile.type;
  const fileExtension = fileType.split("/")[1];
  const fileName = new Date().toISOString();
  const filePath = `images/${fileName}.${fileExtension}`;

  const uploadRef = ref(storage, filePath);

  const uploadTask = await uploadBytes(uploadRef, imageFile);

  await uploadTask;

  const downloadURL = await getDownloadURL(uploadRef);

  return downloadURL;
};

export const uploadVideoAndGetURL = async (videoFile: any) => {
  const fileType = videoFile.type;
  const fileExtension = fileType.split("/")[1];
  const fileName = new Date().toISOString();
  const filePath = `videos/${fileName}.${fileExtension}`;

  const uploadRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(uploadRef, videoFile);

  await uploadTask;

  const downloadURL = await getDownloadURL(uploadRef);

  return downloadURL;
};
