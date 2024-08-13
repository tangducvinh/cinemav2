import { GoClock } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa6";
import ButtonChoose from "./ButtonChoose";

const dataKind = [
  {
    title: "Hài",
    link: "kkk",
  },
  {
    title: "Kinh Dị",
    link: "kkk",
  },
  {
    title: "Gật Gân",
    link: "kkk",
  },
];

const InforMovie = () => {
  return (
    <div className="flex w-full">
      <img
        className="h-[400px] absolute rounded-sm mt-[-60px] object-contain border-[3px] border-white"
        src="https://cdn.galaxycine.vn/media/2024/8/1/handsome-guys-500_1722487016960.jpg"
        alt="poster"
      ></img>
      <div className="flex flex-3"></div>

      <div className="flex flex-col flex-7 ml-8 mt-[50px]">
        <h2 className="text-black text-[30px] font-semibold">
          Đẹp Trai...Thấy Sai Sai
        </h2>
        <div className="flex item-center gap-4">
          <div className="flex items-center gap-1">
            <GoClock className="text-main" />
            <span>127 phút</span>
          </div>

          <div className="flex items-center gap-1">
            <IoCalendarClearOutline className="text-main" />
            <span>09/03/2024</span>
          </div>
        </div>

        <div className="flex mt-2 items-center gap-1">
          <FaStar className="text-main" size="22" />
          <span className="text-[20px] text-normal">8.9</span>
        </div>

        <div className="mt-2 text-[15px] text-[#777777]">
          Quốc gia:{" "}
          <span className="ml-3 text-normal text-[16px]">Hàn Quốc</span>
        </div>
        <div className="mt-2 text-[15px] text-[#777777]">
          Nhà xuất bản:{" "}
          <span className="ml-3 text-normal text-[16px]">Hive Media Corp</span>
        </div>

        <div className="flex mt-2 gap-1 items-center">
          <p className="w-[80px] text-[15px] text-[#777777]">Thể loại:</p>
          {dataKind.map((item) => (
            <ButtonChoose key={item.link} title={item.title} link={item.link} />
          ))}
        </div>

        <div className="flex mt-2 gap-1 items-center">
          <p className="w-[80px] text-[15px] text-[#777777]">Đạo diễn:</p>
          {dataKind.map((item) => (
            <ButtonChoose key={item.link} title={item.title} link={item.link} />
          ))}
        </div>

        <div className="flex mt-2 gap-1 items-center">
          <p className="w-[80px] text-[15px] text-[#777777]">Diễn viên:</p>
          {dataKind.map((item) => (
            <ButtonChoose key={item.link} title={item.title} link={item.link} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InforMovie;
