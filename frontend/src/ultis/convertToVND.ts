export const convertToVND = (total: number) => {
  return total.toLocaleString("vi", { style: "currency", currency: "VND" });
};
