import { IShowSearch } from "@/app/types/frontend";

const apiShow = {
  getListShow: async (data: IShowSearch) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/show/list-show?date=${data.date}&movieId=${
          data.movieId
        }&cityId=${data.cityId === 0 ? "" : data.cityId}&cinemaId=${
          data.cinemaId === 0 ? "" : data.cinemaId
        }`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      console.log("here");

      if (result.success) {
        return result.data;
      }
    } catch (e) {
      console.log(e);
    }
  },
};

export default apiShow;
