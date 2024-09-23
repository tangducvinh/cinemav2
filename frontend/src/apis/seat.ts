const apiSeat = {
  getListSeat: async (roomId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/seat/list-seat?roomId=${roomId}`,
      {
        method: "GET",
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
  getListOrderedSeat: async (showId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/seat/list-ordered-seat?showId=${showId}`,
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

export default apiSeat;
