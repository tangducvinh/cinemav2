import http from "@/lib/http";

const apiGenre = {
  getListGenres: () => http.get("/genre"),
};

export default apiGenre;
