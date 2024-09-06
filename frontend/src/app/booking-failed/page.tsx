import HeaderBooking from "@/components/booking/HeaderBooking";
import logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const BookingFailed = () => {
  return (
    <div className="bg-gray-100 pb-10">
      <HeaderBooking currentIndex={5} />

      <div className="w-[900px] p-5 mx-auto rounded-md bg-white shadow-md mt-12">
        <Image
          className="w-[80px] mt-8 h-[80px] mx-auto"
          src={logo}
          alt="logo"
        ></Image>

        <h2 className="text-[#333333] text-[22px] text-center font-bold mt-4">
          Xuất vé thất bại
        </h2>

        <p className="text-[15px] text-[#333333] mt-4">
          Trường hợp giao dịch chưa thành công, quý khách vui lòng không thực
          hiện giao dịch online lần nữa và tới rạp Galaxy Cinema gần nhất để mua
          vé.
        </p>

        <p className="text-[15px] text-[#333333] mt-4">
          Việc phản hồi tới quý khách có thể bị chậm trễ, mong quý khách thông
          cảm và kiên nhẫn cùng nhân viên CSKH của Galaxy Cinema
        </p>

        <p className="text-[15px] text-[#333333] mt-4">
          Chúng tôi cam kết sẽ hoàn lại 100% giá trị giao dịch lỗi đã bị trừ
          tiền sau khi đội ngũ CSKH kiểm tra và xác nhận. Vui lòng gởi thông tin
          giao dịch lỗi về email supports@galaxystudio.vn hoặc tin nhắn trang
          fanpage https://www.facebook.com/galaxycinevn
        </p>

        <div className="flex justify-center mb-6">
          <Link
            href={"/"}
            className="bg-main px-8 py-3 text-[16px] rounded-sm mt-6 text-white hover:opacity-90 hover:cursor-pointer"
          >
            Quay về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingFailed;
