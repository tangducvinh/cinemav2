import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";

const apiUser = {
  signUp: async (data: IFormSignUp) => {
    const response = await fetch(`${process.env.URL_SERVER_API}/user/sign-up`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    return response.json();
  },
  signIn: async (data: IFormSignIn) => {
    const response = await fetch(
      `https://cinemav2-api.vercel.app/api/user/sign-in`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    return response.json();
  },
  getProfile: async (token: string | undefined) => {
    const response = await fetch(`${process.env.URL_SERVER_API}/user/profile`, {
      method: "GET",
      headers: { token: `Bearer ${token}` },
      cache: "no-store",
    });

    return response.json();
  },
  changePassword: async (
    token: string | undefined,
    data: { currentPassword: string; newPassword: string }
  ) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/user/change-password`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          token: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    return response.json();
  },
};

export default apiUser;
