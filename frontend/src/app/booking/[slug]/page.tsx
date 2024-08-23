import HeaderBooking from "@/components/booking/HeaderBooking";
import ChangeShow from "@/components/booking/ChangeShow";
import DetailShow from "@/components/booking/DetailShow";
import MapSeat from "@/components/booking/MapSeat";

const Booking = () => {
  return (
    <div className="bg-[#F9F9F9]">
      <HeaderBooking currentIndex={1} />

      <div className="w-main mx-auto flex gap-3 pb-[70px]">
        <div className="flex-7">
          <ChangeShow />

          <MapSeat />
        </div>

        <div className="flex-3">
          <DetailShow />

          <div className="flex mt-8">
            <button className="text-[18px] flex-1 py-2 text-main">
              Quay lại
            </button>

            <button className="text-[18px] text-white flex-1 rounded-md py-2 bg-main hover:opacity-85">
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
