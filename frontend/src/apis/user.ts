import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";

const apiUser = {
  signUp: async (data: IFormSignUp) => {
    const response = await fetch(`http://localhost:7000/api/user/sign-up`, {
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
    const response = await fetch(`http://localhost:7000/api/user/sign-in`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    return response.json();
  },
};

export default apiUser;
