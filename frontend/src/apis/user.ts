import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";
import http from "@/lib/http";

const apiUser = {
  signUp: (data: IFormSignIn) => http.post(`/user/sign-up`, data),

  signIn: (data: IFormSignIn) =>
    http.post(`/user/sign-in`, data, { credentials: "include" }),

  getProfile: (token: string | undefined) =>
    http.get("/user/profile", { headers: { token: `Bearer ${token}` } }),

  changePassword: (
    token: string | undefined,
    data: { currentPassword: string; newPassword: string }
  ) =>
    http.put("/user/change-password", data, {
      headers: { token: `Bearer ${token}` },
    }),
};

export default apiUser;
