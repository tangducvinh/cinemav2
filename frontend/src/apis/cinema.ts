import http from "@/lib/http";

const apiCinema = {
  getListCinema: (cityId: number) => http.get(`/cinema?cityId=${cityId}`),
};

export default apiCinema;
