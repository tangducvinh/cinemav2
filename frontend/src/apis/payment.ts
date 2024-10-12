import { IDataPayment } from "@/app/types/frontend";
import http from "@/lib/http";

const apisPayment = {
  payWithVNPay: (data: IDataPayment, token: string) =>
    http.post("/payment/vnp", data, { headers: { token: `Bearer ${token}` } }),
};

export default apisPayment;
