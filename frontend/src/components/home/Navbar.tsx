"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import { IMovie } from "@/app/types/frontend";

import MovieContainer from "./MovieContainer";
import MenuTitle from "./MenuTitle";

const titleList = [
  {
    title: "Đang chiếu",
    value: "showing",
  },
  {
    title: "Sắp chiếu",
    value: "soon",
  },
  {
    title: "Phim IMAX",
    value: "imax",
  },
];

interface IProps {
  movies: IMovie[];
}

const NavBar: React.FC<IProps> = ({ movies }) => {
  const [currentStatus, setCurrentStatus] = useState<string>(
    titleList[0].value
  );

  // delete data localStorage of booking page
  useEffect(() => {
    localStorage.setItem("selectedFood", "");
    localStorage.setItem("buyStatus", "");
    // localStorage.setItem("seatSelected", "");
    // localStorage.setItem("currentShow", "");
  }, []);

  return (
    <>
      <div className="flex items-center mb-[30px]">
        <MenuTitle title={"PHIM"} />

        <ul className="flex items-center gap-8">
          {titleList?.map((item) => (
            <li
              key={item.value}
              onClick={() => setCurrentStatus(item.value)}
              className={clsx(
                "font-bold relative text-[18px] hover:text-forcus cursor-pointer transition-all",
                {
                  "opacity-100 text-forcus": currentStatus === item.value,
                  "text-overlay opacity-60": currentStatus !== item.value,
                }
              )}
            >
              {item.title}
              {currentStatus === item.value && (
                <div className="w-[30px] absolute bg-forcus transition-all h-[2px] left-[50%] translate-x-[-50%]"></div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <MovieContainer
        data={movies?.filter((item) => item.status === currentStatus)}
      />
    </>
  );
};

export default NavBar;
