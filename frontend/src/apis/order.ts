import { IDataOrder, IDataOrderFood } from "@/app/types/frontend";

const apisOrder = {
  createOrder: async (data: IDataOrder) => {
    const response = await fetch(`http://localhost:7000/api/order/create`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
  createOrderFood: async(data:IDataOrderFood ) => {
    const response = await fetch(`http://localhost:7000/api/order/order-food`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
  
      const result = await response.json();
  
      if (result.success) {
        return result.data;
      }
  }
};

export default apisOrder;
