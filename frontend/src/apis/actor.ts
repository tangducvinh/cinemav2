const apiActor = {
  getListActor: async (data?: any) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/actor?` + new URLSearchParams(data),
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
  getDetailActor: async (data?: any) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/actor/detail-actor?` +
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

export default apiActor;
