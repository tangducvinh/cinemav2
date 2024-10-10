import http from "@/lib/http";

const apiCity = {
  // getListCity: async () => {
  //   const response = await fetch(`${process.env.URL_SERVER_API}/city`, {
  //     method: "GET",
  //   });

  //   const result = await response.json();

  //   if (result.success) {
  //     return result.data;
  //   }
  // },
  getListCity: () => http.get("/city"),
};

export default apiCity;
