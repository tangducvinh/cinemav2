import { IDataPayment } from "@/app/types/frontend";

const apisPayment = {
  payWithVNPay: async (data: IDataPayment) => {
    const response = await fetch(`http://localhost:7000/api/payment/vnp`, {
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
};

export default apisPayment;