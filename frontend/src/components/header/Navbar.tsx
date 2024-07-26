"use client";

import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

import NavChild from "./NavChild";

// const data = ["Phim", "Góc Điện Ảnh", "Sự kiện", "Rạp/Giá Vé"];

const data = [
  {
    title: "Phim",
  },
  {
    title: "Góc Điện Ảnh",
    subTitle: [
      {
        name: "Thể loại phim",
      },
      {
        name: "Diễn viên",
      },
      {
        name: "Đạo diễn",
      },
      {
        name: "Bình luận phim",
      },
      {
        name: "Blog Điện ảnh",
      },
    ],
  },
  {
    title: "Sự kiện",
    subTitle: [
      {
        name: "Ưu Đãi",
      },
      {
        name: "Phim Hay Tháng",
      },
    ],
  },
  {
    title: "Rạp/Giá Vé",
  },
];

const NavBar = () => {
  const [showChild, setShowChild] = useState<number>(-1);

  return (
    <nav className="flex gap-6 text-[16px] text-normal">
      <button className="flex items-center gap-1 bg-[#F5811F] px-6 py-2 rounded-sm">
        <FaStar color="white" size="12" />
        <span className="text-[16px] text-white">Mua vé</span>
      </button>

      {data.map((item, index) => (
        <div className="flex items-center gap-1 hover:text-main transition-all cursor-pointer">
          <p onMouseLeave={() => setShowChild(-1)} className="relative">
            <span onMouseEnter={() => setShowChild(index)}>{item.title}</span>

            {showChild === index && item.subTitle && (
              <NavChild data={item.subTitle || []} />
            )}
          </p>
          <IoIosArrowDown />
        </div>
      ))}
    </nav>
  );
};

export default NavBar;
