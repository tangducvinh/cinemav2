import http from "@/lib/http";

const apiSeat = {
  getListSeat: (roomId: number) => http.get(`/seat/list-seat?roomId=${roomId}`),

  getListOrderedSeat: (showId: number) =>
    http.get(`/seat/list-ordered-seat?showId=${showId}`),
};

export default apiSeat;
