"use client";

import { IoIosArrowDown } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

import NavChild from "./NavChild";
import ContainerMovie from "./ContainerMovie";
import { IMovie } from "@/app/types/frontend";

// const data = ["Phim", "Góc Điện Ảnh", "Sự kiện", "Rạp/Giá Vé"];

const data = [
  {
    title: "Phim",
    id: 1,
  },
  {
    title: "Góc Điện Ảnh",
    subTitle: [
      {
        name: "Thể loại phim",
        value: "",
      },
      {
        name: "Diễn viên",
        value: "",
      },
      {
        name: "Đạo diễn",
        value: "",
      },
      {
        name: "Bình luận phim",
        value: "",
      },
      {
        name: "Blog Điện ảnh",
        value: "",
      },
    ],
  },
  {
    title: "Sự kiện",
    subTitle: [
      {
        name: "Ưu Đãi",
        value: "",
      },
      {
        name: "Phim Hay Tháng",
        value: "",
      },
    ],
  },
  {
    title: "Rạp/Giá Vé",
  },
];

interface IProps {
  movies: IMovie[];
}

const NavBar: React.FC<IProps> = ({ movies }) => {
  const [showChild, setShowChild] = useState<number>(-1);

  return (
    <nav className="flex gap-6 text-[16px] text-normal">
      <button className="flex items-center gap-1 bg-[#F5811F] px-6 py-2 rounded-sm">
        <FaStar color="white" size="12" />
        <span className="text-[16px] text-white">Mua vé</span>
      </button>

      {data.map((item, index) =>
        item.id === 1 ? (
          <div
            key={item.title}
            onMouseEnter={() => setShowChild(index)}
            className="flex items-center gap-1 hover:text-main transition-all cursor-pointer"
          >
            <p onMouseLeave={() => setShowChild(-1)} className="relative">
              <span>{item.title}</span>

              <span
                onMouseEnter={() => setShowChild(index)}
                className="w-[100px] h-[50px] block absolute"
              ></span>

              {showChild === index && <ContainerMovie movies={movies} />}
            </p>
            <IoIosArrowDown />
          </div>
        ) : (
          <div
            key={item.title}
            className="flex items-center gap-1 hover:text-main transition-all cursor-pointer"
          >
            <p onMouseLeave={() => setShowChild(-1)} className="relative">
              <span onMouseEnter={() => setShowChild(index)}>{item.title}</span>

              {showChild === index && item.subTitle && (
                <NavChild data={item.subTitle || []} />
              )}
            </p>
            <IoIosArrowDown />
          </div>
        )
      )}
    </nav>
  );
};

export default NavBar;
