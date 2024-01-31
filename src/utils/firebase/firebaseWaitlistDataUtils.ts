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
import { analytics, db } from "../../firebaseConfig";
import { logEvent } from "firebase/analytics";
import MobileDetect from "mobile-detect";

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
      email,
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

export const getReferralNum = async (
  uid: string
): Promise<{ userEmail: string; refNum: number }> => {
  const docRef = doc(db, "waitlistData", "queue", "userData", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap && docSnap.exists() && docSnap.data().referrals !== undefined) {
    return {
      userEmail: docSnap.data().email,
      refNum: docSnap.data().referrals.length,
    };
  } else {
    console.log("No such document: " + docRef.path);
    return { userEmail: "", refNum: -1 };
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
  }).then(async () => {
    await updateUserPositionByNum(referralUID, 1).then(() => {
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

export const isUserOffWaitlist = async (uid: string): Promise<boolean> => {
  const docRef = doc(db, "waitlistData", "queue");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const usersOffWaitlist = docSnap.data().usersOffWaitlist;
    return usersOffWaitlist.includes(uid);
  } else {
    console.log("No such document: " + docRef.path);
    return false;
  }
};

export const logAnalyticsEvent = async (
  eventName: string,
  values: Record<string, string>
) => {
  if (values.message) {
    console.log(
      "Logging event " + eventName + " with message: " + values.message
    );
  }
  const mobileDetect = new MobileDetect(window.navigator.userAgent);
  logEvent(analytics, eventName, {
    ...values,
    triggerTimestamp: new Date().toString(),
    browser: mobileDetect.userAgent(),
    operatingSystem: mobileDetect.os(),
    deviceType: mobileDetect.mobile() ? "mobile" : "desktop",
  });
};

export const moveUsersOffWaitlist = async({numUsers, startIndex} : {numUsers: number, startIndex: number}) => {
  const queueArray = (await getQueue()).slice(startIndex, startIndex + numUsers);

  const usersOffWaitlistRef = doc(db, "waitlistData", "queue");

  for (let i = startIndex; i < startIndex + numUsers; i++) {
    updateDoc(usersOffWaitlistRef, {
      usersOffWaitlist: arrayUnion(queueArray[i])
    })
  }

  return true;
}