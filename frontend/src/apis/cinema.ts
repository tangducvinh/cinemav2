const apiCinema = {
  getListCinema: async (cityId: number) => {
    const response = await fetch(
      `http://localhost:7000/api/cinema?cityId=${cityId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apiCinema;
