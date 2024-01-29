import { RestaurantMenu, RestaurantMenuItem, MenuOption } from "../types";
import {
    collection,
    getDocs,
    collectionGroup
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export const getRestaurantMenu = async (restaurantId : string) : Promise<RestaurantMenu> => {
    const menuCollectionRef = collection(db, `restaurants/${restaurantId}/orderItems`)
    const menuQuery = collectionGroup(db, menuCollectionRef.id);
    const menu : RestaurantMenu = await getDocs(menuQuery).then((menuItemSnapshots) => {
        var menuItems : RestaurantMenuItem[] = [];
        menuItemSnapshots.forEach(async (menuItemDoc) => {
            // Access the data of each document using menuItemDoc.data()
            const { itemId, itemName, basePrice } = menuItemDoc.data();

            const menuItemOptionsRef = collection(db, `restaurants/${restaurantId}/orderItems/${menuItemDoc.id}/options`)
            const menuItemOptionsQuery = collectionGroup(db, menuItemOptionsRef.id);
            
            const menuItemOptions : MenuOption[] = await getDocs(menuItemOptionsQuery).then(async (menuOptionSnapshot) => {
                var optionsForItem : MenuOption[] = []; 
                menuOptionSnapshot.forEach(async (menuOption) => {
                    const { optionName, price } = menuOption.data();
                    optionsForItem.push({ optionId: "", name: optionName, price });
                })
                return optionsForItem; 
            })

            const menuItem : RestaurantMenuItem = {
                restaurantId,
                itemId: itemId,
                name: itemName,
                basePrice: basePrice,
                options: menuItemOptions
            }

            menuItems.push(menuItem);
        });

        const menu : RestaurantMenu = {
            id: restaurantId, 
            menu: menuItems
        }
        return menu;
    })
    return menu;
}   

// load restaurant, load menu, prices, options, and redirect to checkout 