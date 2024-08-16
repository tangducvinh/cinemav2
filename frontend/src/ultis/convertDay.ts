export const convertDay = (day: number) => {
  switch (day) {
    case 0:
      return "Chủ Nhật";
    case 1:
      return "Thứ Hai";
    case 2:
      return "Thứ Ba";
    case 3:
      return "Thứ Tư";
    case 4:
      return "Thứ Năm";
    case 5:
      return "Thứ Sáu";
    case 6:
      return "Thứ Bảy";
  }
};
