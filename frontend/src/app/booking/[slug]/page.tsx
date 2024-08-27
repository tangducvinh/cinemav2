import HeaderBooking from "@/components/booking/HeaderBooking";

import ContentShow from "@/components/booking/ContentShow";
import apiShow from "@/apis/show";

const Booking = async ({ params }: { params: { slug: string } }) => {
  const detailShow = await apiShow.getDetailShow(Number(params.slug));

  return (
    <div className="bg-[#F9F9F9]">
      <HeaderBooking currentIndex={1} />

      <ContentShow detailShow={detailShow} slug={Number(params.slug)} />
    </div>
  );
};

export default Booking;
