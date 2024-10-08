const apiMovie = {
  getDetailMovie: async (slug: string) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/movie/detail-movie?slug=${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
  getListMovie: async (data?: any) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/movie?` + new URLSearchParams(data),
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();
    if (result?.success) {
      return result?.data;
    }
  },
};

export default apiMovie;
