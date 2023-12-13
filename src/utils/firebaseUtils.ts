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
import { db } from "../firebaseConfig";

export const addEmailToQueue = async (
  email: string
): Promise<{ res: boolean; uid: string }> => {
  const emailExists = await checkIfEmailExists(email);
  if (!emailExists.res) {
    const queueArray = await getQueue();
    const docId = await addEmailToUserData(email);
    if (docId !== "") {
      await setDoc(doc(db, "waitlistData", "queue"), {
        queueArray: [...queueArray, docId],
      }).catch((error) => {
        console.log("Error adding email to queue: " + error);
        return { res: false, uid: "" };
      });
      // await updateQueueIndexProp(docId, queueArray.length).then(() => {
      //   console.log("Updated queue index");
      // });
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

// export const updateQueueIndexProp = async (
//   docID: string,
//   newQueueIndex: number
// ) => {
//   const docRef = doc(db, "waitlistData", "queue", "userData", docID);
//   await updateDoc(docRef, {
//     queueIndex: newQueueIndex,
//   });
// };

export const getQueue = async (): Promise<string[]> => {
  const docRef = doc(db, "waitlistData", "queue");
  const docSnap = await getDoc(docRef);
  if (docSnap && docSnap.exists() && docSnap.data().queueArray !== undefined) {
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

export const getIndexInQueue = async (
  userDataDocID: string
): Promise<number> => {
  const docRef = doc(db, "waitlistData", "queue");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const queueArray = docSnap.data().queueArray;
    return queueArray.indexOf(userDataDocID);
  } else {
    console.log("No such document: " + docRef.path);
    return -1;
  }
};

export const getReferralNum = async (uid: string): Promise<number> => {
  const docRef = doc(db, "waitlistData", "queue", "userData", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap && docSnap.exists() && docSnap.data().referrals !== undefined) {
    return docSnap.data().referrals.length;
  } else {
    console.log("No such document: " + docRef?.path);
    return -1;
  }
};

export const checkIfValidUID = async (uid: string): Promise<boolean> => {
  const docRef = doc(db, "waitlistData", "queue", "userData", uid);
  const docSnap = await getDoc(docRef).catch((error) => {
    console.log("Error getting document " + uid + ": ", error);
  });
  if (!docSnap || docSnap === undefined || docSnap === null) {
    return false;
  }
  return docSnap.exists();
};

export const addUserReferral = async (referralUID: string, newUID: string) => {
  const docRef = doc(db, "waitlistData", "queue", "userData", referralUID);
  await updateDoc(docRef, {
    referrals: arrayUnion(newUID),
  }).then(() => {
    updateUserPositionByNum(referralUID, 1).then(() => {
      console.log("Moved user up in queue by 1");
    });
  });
};

export const updateUserPositionByNum = async (
  uid: string,
  spotsToMoveUp: number
) => {
  const oldQueueIndex = await getIndexInQueue(uid);
  let newQueueIndex = oldQueueIndex - spotsToMoveUp;
  if (newQueueIndex < 0) {
    newQueueIndex = 0;
  }
  const qArray = await getQueue();
  if (newQueueIndex >= qArray.length) {
    newQueueIndex = qArray.length - 1;
  }
  if (newQueueIndex >= 0) {
    qArray.splice(oldQueueIndex, 1);
    qArray.splice(newQueueIndex, 0, uid);
    await setDoc(doc(db, "waitlistData", "queue"), {
      queueArray: qArray,
    })
      .then(() => {
        console.log("Updated queue array");
      })
      .catch((error) => {
        console.log("Error adding email to queue: " + error);
      });
  }
};
