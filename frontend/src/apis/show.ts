import { IShowSearch } from "@/app/types/frontend";

const apiShow = {
  getListShow: async (data: IShowSearch) => {
    const response = await fetch(
      `http://localhost:7000/api/show/list-show?date=${data.date}&movieId=${
        data.movieId
      }${data.cityId ? "&cityId = " + data.cityId : ""}${
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
      `http://localhost:7000/api/show/detail-show?showId=${showId}`,
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
};

export default apiShow;
