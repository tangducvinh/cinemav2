const apiDirector = {
  getListDirector: async (data?: any) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/director?` + new URLSearchParams(data),
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();
    if (result?.success) {
      return result?.data;
    }
  },
  getDetailDirector: async (data?: any) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/director/detail-director?` +
        new URLSearchParams(data),
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();
    if (result?.success) {
      return result?.data;
    }
  },
};

export default apiDirector;
