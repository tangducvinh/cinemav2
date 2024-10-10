import http from "@/lib/http";

const apiFood = {
  getListFood: () => http.get("/food/list-food"),
};

export default apiFood;
