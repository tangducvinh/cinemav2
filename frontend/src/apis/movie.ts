import http from "@/lib/http";

const apiMovie = {
  // getDetailMovie: async (slug: string) => {
  //   const response = await fetch(
  //     `${process.env.URL_SERVER_API}/movie/detail-movie?slug=${slug}`,
  //     {
  //       method: "GET",
  //       cache: "no-store",
  //     }
  //   );

  //   return response.json();
  // },
  getDetailMovie: (slug: string) =>
    http.get(`/movie/detail-movie?slug=${slug}`),

  getListMovie: (data?: any) => {
    return http.get("/movie?" + new URLSearchParams(data));
  },
};

export default apiMovie;
