import http from "@/lib/http";

export const apisBanner = {
  getListBanner: () => http.get("/banner"),
};
