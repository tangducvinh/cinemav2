const apiSeat = {
  getListSeat: async (roomId: number) => {
    const response = await fetch(
      `http://localhost:7000/api/seat/list-seat?roomId=${roomId}`,
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
      `http://localhost:7000/api/seat/list-ordered-seat?showId=${showId}`,
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
