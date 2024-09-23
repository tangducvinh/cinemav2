const apiCinema = {
  getListCinema: async (cityId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/cinema?cityId=${cityId}`,
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
