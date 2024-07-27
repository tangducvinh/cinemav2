"use client";

import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { IMovie } from "@/app/types/frontend";

import MovieContainer from "./MovieContainer";

// const titleList = ["Đang chiếu", "Sắp chiếu", "Phim IMAX"];

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

interface IItem {
  value: string;
}

const NavBar = () => {
  const [currentStatus, setCurrentStatus] = useState<string>(
    titleList[0].value
  );

  const [movieData, setMovieData] = useState<IMovie[] | []>([]);

  const fetchDataMovie = async () => {
    const response = await fetch(
      `http://localhost:7000/api/movie?status=${currentStatus}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    setMovieData(data.data);
  };

  useEffect(() => {
    fetchDataMovie();
  }, [currentStatus]);

  return (
    <>
      <div className="flex items-center mb-[30px]">
        <h1 className="border-l-[5px] border-forcus px-3 leading-6 mr-8 text-normal font-bold text-[22px]">
          PHIM
        </h1>

        <ul className="flex items-center gap-8">
          {titleList.map((item) => (
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

      <MovieContainer data={movieData} />
    </>
  );
};

export default NavBar;
