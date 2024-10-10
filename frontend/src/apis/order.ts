import { IDataOrder, IDataOrderFood } from "@/app/types/frontend";
import http from "@/lib/http";

const apisOrder = {
  createOrder: async (data: IDataOrder, token: string) => {
    const response = await fetch(`${process.env.URL_SERVER_API}/order/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });

    return response.json();
  },

  // createOrder: (data: IDataOrder, token: string) =>
  //   http.post("/order/create", data, { headers: { token: `Bearer ${token}` } }),

  createOrderFood: async (data: IDataOrderFood) => {
    const response = await fetch(
      `${process.env.URL_SERVER_API}/order/order-food`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
  deleteOrderAndOrderedSeat: async (orderId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/order/delete-order-and-ordered-seat?orderId=${orderId}`,
      {
        method: "DELETE",
      }
    );

    return response.json();
  },
  deleteOrderedFood: async (orderId: number) => {
    const response = await fetch(
      `${process.env.URL_SERVER}/order/delete-ordered-food?orderId=${orderId}`,
      {
        method: "DELETE",
      }
    );

    return response.json();
  },
};

export default apisOrder;
