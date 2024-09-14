export type ToastType = {
  type: "info" | "success" | "error";
  message: string;
  key: string;
};

export type GenericToastType = {
  bakeToast: ToastType;
};
