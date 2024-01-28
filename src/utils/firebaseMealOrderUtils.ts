import { ListingInfo, RestaurantMenu } from "../types";
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
  import { analytics, db } from "../firebaseConfig";
  import { logEvent } from "firebase/analytics";

export const n = () => {};

// export const getListingInfo : ListingInfo =  () => {
//     return null
// }

export const getRestaurantMenu : RestaurantMenu = () => {
    
}

// load restaurant, load menu, prices, options, and redirect to checkout 