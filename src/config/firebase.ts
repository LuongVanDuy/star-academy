import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.firebaseApiKey,
  authDomain: process.env.firebaseAuthDomain,
  projectId: process.env.firebaseProjectId,
  storageBucket: process.env.firebaseStorageBucket,
  messagingSenderId: process.env.firebaseMessagingSenderId,
  appId: process.env.firebaseAppId,
};

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export const db = getFirestore(firebase);
export const storage = getStorage(firebase);
export const functions = getFunctions(firebase);

export default firebase;
