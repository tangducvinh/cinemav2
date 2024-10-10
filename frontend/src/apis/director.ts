import http from "@/lib/http";

const apiDirector = {
  getListDirector: (data?: any) =>
    http.get(`/director?` + new URLSearchParams(data)),

  getDetailDirector: (data?: any) =>
    http.get("/director/detail-director?" + new URLSearchParams(data)),
};

export default apiDirector;
