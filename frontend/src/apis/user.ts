import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";
import http from "@/lib/http";
import axios from "axios";

const apiUser = {
  signUp: (data: IFormSignIn) => http.post(`/user/sign-up`, data),
  // signIn: async (data: IFormSignIn) => {
  //   const response = await fetch(`${process.env.URL_SERVER_API}/user/sign-in`, {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     credentials: "include",
  //   });

  //   // const response = await axios({
  //   //   method: "post",
  //   //   url: `${process.env.URL_SERVER_API}/user/sign-in`,
  //   //   data,
  //   //   withCredentials: true,
  //   // });

  //   return response.json();
  //   // return response;
  // },
  signIn: (data: IFormSignIn) => http.post(`/user/sign-in`, data),

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
