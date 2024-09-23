import { IShowSearch } from "@/app/types/frontend";

const apiShow = {
  getListShow: async (data: IShowSearch) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/show/list-show?date=${data.date}&movieId=${
        data.movieId
      }${data.cityId ? "&cityId=" + data.cityId : ""}${
        data.cinemaId ? "&cinemaId=" + data.cinemaId : ""
      }`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
  getDetailShow: async (showId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/show/detail-show?showId=${showId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    } else {
      return null;
    }
  },
  getCinemaByMovieId: async (movieId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/show/list-cinema?movieId=${movieId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
  getDateFastBooking: async (movieId: number, cinemaId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/show/date-fast-booking?movieId=${movieId}&cinemaId=${cinemaId}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
  getShowFastBooking: async (
    movieId: number,
    cinemaId: number,
    date: string
  ) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/show/show-fast-booking?movieId=${movieId}&cinemaId=${cinemaId}&date=${date}`,
      {
        method: "GET",
        cache: "no-store",
      }
    );

    return response.json();
  },
};

export default apiShow;
