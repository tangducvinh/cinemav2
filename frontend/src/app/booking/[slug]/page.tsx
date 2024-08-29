import HeaderBooking from "@/components/booking/HeaderBooking";

import ContentShow from "@/components/booking/ContentShow";
import apiShow from "@/apis/show";
import apiFood from "@/apis/food";

const Booking = async ({ params }: { params: { slug: string } }) => {
  // const detailShow = await apiShow.getDetailShow(Number(showId));
  const comboFoods = await apiFood.getListFood();

  return (
    <>
      <ContentShow
        // detailShow={detailShow}
        slug={Number(params.slug)}
        dataFood={comboFoods}
      />
    </>
  );
};

export default Booking;
