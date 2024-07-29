import { FaSquareFacebook } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsPhoneFill } from "react-icons/bs";
import { FaPhone } from "react-icons/fa6";
import { FaPaperPlane } from "react-icons/fa";

const dataFooter = [
  {
    title: "Giới thiệu",
    subTitle: [
      "Về Chúng Tôi",
      "Thoả Thuận Sử Dụng",
      "Quy Chế Hoạt Động",
      "Chính Sách Bảo Mật",
    ],
  },
  {
    title: "GÓC ĐIỆN ẢNH",
    subTitle: [
      "Thể Loại Phim",
      "Bình Luận Phim",
      "Blog Điện Ảnh",
      "Phim Hay Tháng",
      "Phim IMAX",
    ],
  },
  {
    title: "HỖ TRỢ",
    subTitle: ["Góp Ý", "Sale & Services", "Rạp / Giá Vé", "Tuyển Dụng", "FAQ"],
  },
];

const infor = {
  name: "Công ty cổ phần phim cinema",
  address: "Liên Chiểu, Đà Nẵng, Việt Nam",
  phone: "0989999777",
  hotline: "19007777",
  gmail: "cinemadn@gmail.com",
};

const Footer = () => {
  return (
    <section className="w-main">
      <div className="grid-cols-4 grid border-b-[3px] pb-4">
        {dataFooter.map((item) => (
          <div>
            <h3 className="uppercase mb-7 text-white text-[16px] font-bold">
              {item.title}
            </h3>
            <ul>
              {item.subTitle.map((data) => (
                <li className="text-[16px] text-[#D0D0D0] mb-3">{data}</li>
              ))}
            </ul>
          </div>
        ))}

        <div className="flex gap-2">
          <FaSquareFacebook size="35" color="gray" />
          <FaYoutube size="35" color="gray" />
          <FaSquareInstagram size="35" color="gray" />
        </div>
      </div>

      <div>
        <h2 className="uppercase text-[20px] text-[#D0D0D0] mt-5">
          {infor.name}
        </h2>
        <p className="text-[14px] text-[#8D8D8D] mt-1">{infor.address}</p>
        <p className="flex items-center gap-4 text-[14px]">
          <span className="flex items-center gap-1 text-[#8D8D8D]">
            <BsPhoneFill color="gray" /> {infor.phone}
          </span>
          <span className="flex items-center gap-1 text-[#8D8D8D]">
            <FaPhone color="gray" />
            {infor.hotline}
          </span>
          <span className="flex items-center gap-1 text-[#8D8D8D]">
            <FaPaperPlane color="gray" />
            {infor.gmail}
          </span>
        </p>
      </div>
    </section>
  );
};

export default Footer;
