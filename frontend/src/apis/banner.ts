export const apisBanner = {
  getListBanner: async () => {
    const response = await fetch("http://localhost:7000/api/banner", {
      method: "GET",
      cache: "no-store",
    });
    return response.json();
  },
};
