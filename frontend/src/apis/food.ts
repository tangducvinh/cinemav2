const apiFood = {
  getListFood: async () => {
    const response = await fetch(`http://localhost:7000/api/food/list-food`, {
      method: "GET",
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apiFood;
