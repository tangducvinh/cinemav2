import { IDataPayment } from "@/app/types/frontend";

const apisPayment = {
  payWithVNPay: async (data: IDataPayment, token: string) => {
    const response = await fetch(`${process.env.URL_SERVER_API}/payment/vnp`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        token: `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (result.success) {
      return result.data;
    }
  },
};

export default apisPayment;
