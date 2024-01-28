export enum CollegeEmailSuffixes {
  GeorgiaTech = "@gatech.edu",
}

export type ToastInfo =
  | { message: string; type: "success" | "error" }
  | undefined;

export type ListingInfo = {
    orderEnd: Date,
    orderStart: Date,
    pickupStart: Date,
    pickupEnd: Date,
    restaurantId: string
}

export type RestaurantMenuItem = {
    restaurantId: string,
    stripeId: string,
    name: string,
    basePrice: number,
    options?: MenuOption[]
}

export type RestaurantMenu = {
    id: string, 
    menu: RestaurantMenuItem[]
}

export type MenuOption = {
  name: string, 
  price: number
}