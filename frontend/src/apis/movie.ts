const apiMovie = {
  getListMovie: async (status?: string) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/movie${status ? "?status=" + status : ""}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();
    if (result?.success) {
      return result.data;
    }
  },
  getDetailMovie: async (slug: string) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/movie/detail-movie?slug=${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
};

export default apiMovie;
