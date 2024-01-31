import { ListingInfo } from "../../types";
import { db } from "../../firebaseConfig";
import {
    doc,
    collection,
    getDocs,
    collectionGroup
} from "firebase/firestore";

export const getListingInfo = async (restaurantId : string) : Promise<ListingInfo | void> => {
    const currentListingRef = collection(db, `listings/${restaurantId}/currentListing`);
    const currentListingQuery = collectionGroup(db, currentListingRef.id);
    const currentListingInfo = await getDocs(currentListingQuery).then((listingInfoSnapshots) => {
        var listings : ListingInfo[] = [];
        listingInfoSnapshots.forEach(async (listingInfoDoc) => {
            const { pickupEnd, pickupStart, orderEnd, orderStart, pickupLocation } = listingInfoDoc.data();

            const listing : ListingInfo = {
                pickupEnd, 
                pickupStart, 
                pickupLocation, 
                orderEnd,
                orderStart, 
                restaurantId
            }

            listings.push(listing);
        })
        return listings[0];
    })
    
    return currentListingInfo;
}