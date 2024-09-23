export const apisBanner = {
  getListBanner: async () => {
    const response = await fetch(`${process.env.URL_SERVER_API}/banner`, {
      method: "GET",
      cache: "no-store",
    });
    return response.json();
  },
};
