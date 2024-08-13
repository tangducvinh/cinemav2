export const getMovieByStatus = async (status: string) => {
  const response = await fetch(
    `http://localhost:7000/api/movie?status=${status}`,
    {
      method: "GET",
    }
  );

  const data = await response.json();
  return data;
};
