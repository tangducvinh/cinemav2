const apiCity = {
  getListCity: async () => {
    const response = await fetch(`http://localhost:7000/api/city`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apiCity;
