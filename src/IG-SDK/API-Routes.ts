import { API_ROUTES_Interface } from "@/models/interfaces/API-Routes.interface";

export const API_ROUTES: Readonly<API_ROUTES_Interface> = Object.freeze({
  user: {
    signIn: "/v1/user/sign-in",
  },
});
