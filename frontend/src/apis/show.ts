import { IShowSearch } from "@/app/types/frontend";
import http from "@/lib/http";

const apiShow = {
  getListShow: (data: any) =>
    http.get("/show/list-show?" + new URLSearchParams(data)),

  getDetailShow: (showId: number) =>
    http.get(`/show/detail-show?showId=${showId}`),
  
  getCinemaByMovieId: (movieId: number) => http.get(`/show/list-cinema?movieId=${movieId}`),

  getDateFastBooking: (movieId: number, cinemaId: number) => http.get(`/show/date-fast-booking?movieId=${movieId}&cinemaId=${cinemaId}`) ,
 
  getShowFastBooking: (movieId: number, cinemaId: number, date: string) => http.get(`/show/show-fast-booking?movieId=${movieId}&cinemaId=${cinemaId}&date=${date}`)
};

export default apiShow;
