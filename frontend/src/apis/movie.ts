const apiMovie = {
  getListMovie: async (status?: string) => {
    const response = await fetch(
      `http://localhost:7000/api/movie${status ? "?status=" + status : ""}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json()
    if (result?.success) {
      return result.data
    }
  },
  getDetailMovie: async (slug: string) => {
    const response = await fetch(
      `http://localhost:7000/api/movie/detail-movie?slug=${slug}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
};

export default apiMovie;
