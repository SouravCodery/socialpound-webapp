import { API_ROUTES_Interface } from "@/models/interfaces/API-Routes.interface";

export const API_ROUTES: Readonly<API_ROUTES_Interface> = Object.freeze({
  user: {
    login: "/v1/user/signIn",
  },
});
