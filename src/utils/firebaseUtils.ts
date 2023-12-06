import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";

export const addEmailToQueue = async (
  email: string
): Promise<{ res: boolean; uid: string }> => {
  const emailExists = await checkIfEmailExists(email);
  if (!emailExists.res) {
    const queueArray = await getQueue();
    const docId = await addEmailToUserData(email);
    if (docId !== "") {
      const docRef = await setDoc(doc(db, "waitlistData", "queue"), {
        queueArray: [...queueArray, docId],
      }).catch((error) => {
        console.log("Error adding email to queue: " + error);
        return;
      });
      await updateQueueIndexProp(docId, queueArray.length).then(() => {
        console.log("Updated queue index");
      });
    }
    return { res: true, uid: docId };
  } else {
    console.log("Email already exists");
    return { res: false, uid: emailExists.uid };
  }
};

export const addEmailToUserData = async (email: string): Promise<string> => {
  const newDoc = await addDoc(
    collection(db, "waitlistData", "queue", "userData"),
    {
      email: email,
      referrals: [],
      timeRegistered: serverTimestamp(),
    }
  ).catch((error) => {
    console.log("Error adding user data: " + error);
  });
  if (newDoc) {
    console.log("Document written with ID: ", newDoc.id);
    return newDoc.id;
  } else {
    console.log("Error adding user data");
    return "";
  }
};

export const updateQueueIndexProp = async (
  docID: string,
  newQueueIndex: number
) => {
  const docRef = doc(db, "waitlistData", "queue", "userData", docID);
  await updateDoc(docRef, {
    queueIndex: newQueueIndex,
  });
};

export const getQueue = async (): Promise<string[]> => {
  const docRef = doc(db, "waitlistData", "queue");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists() && docSnap.data().queueArray !== undefined) {
    return docSnap.data().queueArray;
  } else {
    console.log("No such document: " + docRef.path);
    return [];
  }
};

export const checkIfEmailExists = async (
  email: string
): Promise<{ res: boolean; uid: string }> => {
  const docRef = collection(db, "waitlistData", "queue", "userData");
  const q = query(docRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  return {
    res: querySnapshot.size > 0,
    uid: querySnapshot.size > 0 ? querySnapshot.docs[0].id : "",
  };
};

export const getPositionInQueue = async (
  userDataDocID: string
): Promise<number> => {
  const docRef = doc(db, "waitlistData", "queue", "userData", userDataDocID);
  const docSnap = await getDoc(docRef);
  if (
    docSnap.exists() &&
    docSnap.data().queueIndex !== undefined &&
    docSnap.data().queueIndex !== null
  ) {
    return docSnap.data().queueIndex + 1;
  } else {
    console.log("No such document: " + docRef.path);
    return -1;
  }
};
