import http from "@/lib/http";

const apiActor = {
  getListActor: (data?: any) => http.get(`/actor?` + new URLSearchParams(data)),

  getDetailActor: (data?: any) =>
    http.get(`/actor/detail-actor?` + new URLSearchParams(data)),
};

export default apiActor;
