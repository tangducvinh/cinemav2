import HeaderBooking from "@/components/booking/HeaderBooking";

import ContentShow from "@/components/booking/ContentShow";
import apiFood from "@/apis/food";

const BookingShow = async () => {
  const comboFoods = await apiFood.getListFood();

  return <ContentShow dataFood={comboFoods} />;
};

export default BookingShow;
