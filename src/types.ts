export enum CollegeEmailSuffixes {
  GeorgiaTech = "@gatech.edu",
}

export type ToastInfo =
  | { message: string; type: "success" | "error" }
  | undefined;

export type ListingInfo = {
  orderStart: Date;
  orderEnd: Date;
  pickupStart: Date;
  pickupEnd: Date;
  pickupLocation: string;
  restaurantId: string;
};

export type RestaurantMenuItem = {
    restaurantId: string,
    itemId: string,
    name: string,
    basePrice: number,
    options?: MenuOption[]
}

export type RestaurantMenu = {
  id: string;
  menu: RestaurantMenuItem[];
};

export type Order = {
  orderId: string;
  order: RestaurantMenuItem[];
};

export type MenuOption = {
  optionId: string;
  name: string;
  price: number;
};

export const ResidenceHalls = [
  "Armstrong",
  "Brown",
  "Caldwell",
  "Cloudman",
  "Folk",
  "Freeman",
  "Glenn",
  "Hanson",
  "Harrison",
  "Hopkins",
  "Howell",
  "Matheson",
  "Montag",
  "Perry",
  "Smith",
  "Undergraduate Living Center",
  "Woodruff",
  "Field",
  "Other",
];

export const ClassStanding = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate",
];

export type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  classStanding: string;
  residenceHall: string;
};
