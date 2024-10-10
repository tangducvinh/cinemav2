import http from "@/lib/http";

const apiCountry = {
  // getListCountry: async () => {
  //   const response = await fetch(`${process.env.URL_SERVER_API}/country`, {
  //     method: "GET",
  //   });

  //   const result = await response.json();

  //   if (result.success) {
  //     return result.data;
  //   }
  // },
  getListCountry: () => http.get("/country"),
};

export default apiCountry;
