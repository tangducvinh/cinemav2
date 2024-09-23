const apiCity = {
  getListCity: async () => {
    const response = await fetch(`${process.env.URL_SERVER}/city`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apiCity;
