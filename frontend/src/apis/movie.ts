export const getMovieByStatus = async (status: string) => {
  const response = await fetch(
    `http://localhost:7000/api/movie?status=${status}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  return response.json();
};

export const getDetailMovie = async (slug: string) => {
  const response = await fetch(
    `http://localhost:7000/api/movie/detail-movie?slug=${slug}`,
    {
      method: "GET",
    }
  );

  return response.json();
};
