export enum CollegeEmailSuffixes {
  GeorgiaTech = "@gatech.edu",
}

export type ToastInfo =
  | { message: string; type: "success" | "error" }
  | undefined;

export type ListingInfo = {
  orderEnd: Date;
  orderStart: Date;
  pickupStart: Date;
  pickupEnd: Date;
  restaurantId: string;
};

export type RestaurantMenuItem = {
  itemId: string;
  restaurantId: string;
  name: string;
  basePrice: number;
  options: MenuOption[];
};

export type RestaurantMenu = {
  id: string;
  menu: RestaurantMenuItem[];
};

export type MenuOption = {
  optionId: string;
  name: string;
  price: number;
};
