import { IDataOrder, IDataOrderFood } from "@/app/types/frontend";
import http from "@/lib/http";

const apisOrder = {
  createOrder: (data: IDataOrder, token: string) =>
    http.post("/order/create", data, { headers: { token: `Bearer ${token}` } }),

  createOrderFood: (data: IDataOrderFood) =>
    http.post("/order/order-food", data),

  deleteOrderAndOrderedSeat: (orderId: number) =>
    http.delete(`/order/delete-order-and-ordered-seat?orderId=${orderId}`),

  deleteOrderedFood: (orderId: number) =>
    http.delete(`/order/delete-ordered-food?orderId=${orderId}`),
};

export default apisOrder;
