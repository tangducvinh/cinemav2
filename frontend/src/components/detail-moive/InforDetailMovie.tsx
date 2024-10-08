"use client";

import { useState, useCallback } from "react";
import { GoClock } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import moment from "moment";
import { IDetailMovie } from "@/app/types/frontend";
import { GoPlay } from "react-icons/go";
import Trailer from "../common/Trailer";

interface IProps {
  movie: IDetailMovie;
}

const InforDetailMovie: React.FC<IProps> = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const handleShowTrailer = () => {
    setShowTrailer((prev) => !prev);
  };

  return (
    <div className="flex gap-6 relative">
      {showTrailer && (
        <Trailer keyVideo={movie.video} setShow={handleShowTrailer} />
      )}

      <div className="relative w-[200px]">
        <img src={movie.poster} className="w-full h-full"></img>

        <GoPlay
          onClick={handleShowTrailer}
          className="absolute top-[50%] left-[50%] z-10 text-white text-[50px] translate-x-[-50%] opacity-80 hover:opacity-100 translate-y-[-50%] cursor-pointer"
        />
      </div>

      <div>
        <h2 className="text-[28px] text-[#333333] font-bold">{movie.name}</h2>

        <div className="flex item-center gap-4 text-[14px]">
          <div className="flex items-center gap-1">
            <GoClock className="text-main" />
            <span>{`${movie.runtime} phút`}</span>
          </div>

          <div className="flex items-center gap-1">
            <IoCalendarClearOutline className="text-main" />
            <span>{moment(movie.release).format("DD/MM/yyyy")}</span>
          </div>
        </div>

        <ul className="flex items-center flex-wrap mt-3">
          <span className="text-[14px] text-[#777777] mr-6 ">Diễn viên: </span>
          {movie.actors.map((item, index) => (
            <li
              key={item.slug}
              className="text-black text-[14px] font-bold hover:text-main cursor-pointer"
            >
              {index < movie.actors.length - 1
                ? `${item.name + ", "}`
                : item.name}
            </li>
          ))}
        </ul>

        {/* <ul className="flex items-center flex-wrap mt-3">
          <span className="text-[14px] text-[#777777] mr-6 ">
            Nhà sản xuất:{" "}
          </span>
          {data.map((item) => (
            <li
              key={item.slug}
              className="text-black text-[14px] font-bold hover:text-main cursor-pointer mr-2"
            >
              {item.name}
            </li>
          ))}
        </ul> */}

        <ul className="flex flex-wrap mt-3">
          <span className="text-[14px] text-[#777777] mr-6 ">Thể loại: </span>
          {movie.genres.map((item, index) => (
            <li
              key={item.slug}
              className="text-black text-[14px] font-bold hover:text-main cursor-pointer"
            >
              {index < movie.genres.length - 1
                ? `${item.name + ", "}`
                : item.name}
            </li>
          ))}
        </ul>

        <ul className="flex items-center flex-wrap mt-3">
          <span className="text-[14px] text-[#777777] mr-6 ">Đạo diễn: </span>
          {movie.directors.map((item, index) => (
            <li
              key={item.slug}
              className="text-black text-[14px] font-bold hover:text-main cursor-pointer mr-2"
            >
              {index < movie.directors.length - 1
                ? `${item.name + ", "}`
                : item.name}
            </li>
          ))}
        </ul>

        <p className="text-[14px] text-[#777777] mt-3">
          Quốc gia:
          <span className="ml-6 text-black font-bold hover:text-main">
            {movie.country}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InforDetailMovie;
