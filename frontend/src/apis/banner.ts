export const apisBanner = {
  getListBanner: async () => {
    const response = await fetch(`${process.env.URL_SERVER}/banner`, {
      method: "GET",
      cache: "no-store",
    });
    return response.json();
  },
};
