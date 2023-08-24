import { auth, db } from "@/config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, getDoc} from "firebase/firestore";

export const checkUserAndFetchData = async () => {

  return new Promise(async (resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(collection(db, 'users'), user.uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          const userData = userDoc.data();
          resolve({ ...userData, uid: user.uid });
        } else {
          resolve(null);
        }
      } else {
        resolve(null);
      }
  
      unsubscribe();
    });
  });
};