const apiGenre = {
  getListGenres: async () => {
    const response = await fetch(`${process.env.URL_SERVER_API}/genre`, {
      method: "GET",
    });

    return response.json();
  },
};

export default apiGenre;
