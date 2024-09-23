const apiFood = {
  getListFood: async () => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/food/list-food`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apiFood;
