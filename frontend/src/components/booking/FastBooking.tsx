"use client";

import { useState, useEffect, useCallback } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import { IMovie } from "@/app/types/frontend";
import apiShow from "@/apis/show";
import { ICinema, IShow } from "@/app/types/frontend";
import { convertDay } from "@/ultis/convertDay";
import Notice from "../common/Notice";

interface IProps {
  movies: IMovie[];
}

const FastBooking: React.FC<IProps> = ({ movies }) => {
  const router = useRouter();

  const [currentMovie, setCurrentMovie] = useState<number>(0);
  const [cinemas, setCinemas] = useState<ICinema[]>([]);
  const [currentCinema, setCurrentCinema] = useState<number>(0);
  const [dates, setDates] = useState<{ timeStart: Date }[]>([]);
  const [currentDate, setCurrentDate] = useState<string>();
  const [shows, setShows] = useState<IShow[]>([]);
  const [currentShow, setCurrentShow] = useState<number>();

  const [showWarning, setShowWarning] = useState<boolean>(false);

  useEffect(() => {
    const fetchListCinema = async (movieId: number) => {
      const cinemas = await apiShow.getCinemaByMovieId(movieId);
      if (cinemas.success) {
        setCinemas(cinemas.data);
      }
    };
    if (currentMovie) fetchListCinema(currentMovie);
  }, [currentMovie]);

  useEffect(() => {
    const fetchDate = async (movieId: number, cinemaId: number) => {
      const dates = await apiShow.getDateFastBooking(movieId, cinemaId);

      const newData: any = [];

      dates.data.forEach((item: { timeStart: Date }) => {
        if (
          !newData.some(
            (time: any) =>
              new Date(time.timeStart).getDate() ===
              new Date(item.timeStart).getDate()
          )
        ) {
          newData.push(item);
        }
      });

      setDates(newData);
    };
    if (currentCinema) fetchDate(currentMovie, currentCinema);
  }, [currentCinema, currentMovie]);

  useEffect(() => {
    console.log(currentDate);
    const fetchShow = async (
      movieId: number,
      cinemaId: number,
      date: string
    ) => {
      const shows = await apiShow.getShowFastBooking(movieId, cinemaId, date);

      if (shows.success) {
        setShows(shows.data);
      }
    };

    if (currentDate) fetchShow(currentMovie, currentCinema, currentDate);
  }, [currentDate]);

  const handleBooking = () => {
    if (currentShow) {
      const dataCurrentShow: any = shows.find(
        (item) => item.id === currentShow
      );

      const token = localStorage.getItem("token");
      if (token) {
        router.push(`/booking/${dataCurrentShow.movie.slug}`);
        localStorage.setItem("currentShow", JSON.stringify(dataCurrentShow.id));
      } else {
        setShowWarning(true);
      }
    }
  };

  const handleCloseWarning = useCallback(() => {
    setShowWarning(false);
  }, [showWarning]);

  return (
    <div className="flex items-center w-[1252px] mx-auto h-[56px] left-[50%] translate-x-[-50%] bg-white rounded-md absolute shadow-md top-[95%] z-10">
      {showWarning && (
        <Notice
          text={"Vui lòng thực hiện đăng nhập để có thể đặt vé"}
          onClose={handleCloseWarning}
        />
      )}

      <div className="flex flex-2 items-center pl-2">
        <div className="w-[20px] h-[20px] text-white font-bold rounded-full flex items-center text-sm justify-center bg-main">
          1
        </div>
        <select
          id="countries"
          onChange={(e) => setCurrentMovie(Number(e.target.value))}
          className="hover:cursor-pointer outline-none text-gray-900 w-full p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value={0}>Chọn Phim</option>
          {movies
            ?.filter((x) => x.status === "showing")
            .map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-1 pl-2 items-center">
        <div className="w-[20px] h-[20px] text-white font-bold rounded-full flex items-center text-sm justify-center bg-main">
          2
        </div>
        <select
          onChange={(e) => setCurrentCinema(Number(e.target.value))}
          id="countries"
          className=" hover:cursor-pointer outline-none w-full text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value={0}>Chọn Rạp</option>
          {cinemas?.map((item: any) => (
            <option key={item.cinemaId} value={item.cinemaId}>
              {item.cinema.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 pl-2 flex items-center">
        <div className="w-[20px] h-[20px] text-white font-bold rounded-full flex items-center text-sm justify-center bg-main">
          3
        </div>
        <select
          onChange={(e) =>
            setCurrentDate(moment(e.target.value).format("yyyy/MM/DD"))
          }
          id="countries"
          className=" hover:cursor-pointer outline-none w-full text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value={0}>Chọn Ngày</option>
          {dates?.map((item: { timeStart: any }) => (
            <option key={item.timeStart} value={item.timeStart}>
              {`${convertDay(new Date(item.timeStart).getDay())}, ${moment(
                item.timeStart
              ).format("DD/MM/yyyy")}`}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 pl-2 flex items-center">
        <div className="w-[20px] h-[20px] text-white font-bold rounded-full flex items-center text-sm justify-center bg-main">
          4
        </div>
        <select
          onChange={(e) => setCurrentShow(Number(e.target.value))}
          id="countries"
          className="hover:cursor-pointer outline-none w-full text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block"
        >
          <option value={0}>Chọn Suất</option>
          {shows?.map((item: IShow) => (
            <option key={item.id} value={item.id}>
              {moment(item.timeStart).format("HH:mm")}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleBooking}
        className={clsx(
          "w-[210px]  h-full text-normal text-[18px]",
          { "bg-main": currentShow },
          { "bg-[#F8AC6E]": !currentShow }
        )}
      >
        Mua vé nhanh
      </button>
    </div>
  );
};

export default FastBooking;