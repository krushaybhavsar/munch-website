export enum CollegeEmailSuffixes {
  GeorgiaTech = "@gatech.edu",
}

export type ToastInfo =
  | { message: string; type: "success" | "error" }
  | undefined;
