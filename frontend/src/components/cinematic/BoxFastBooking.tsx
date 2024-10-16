"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import moment from "moment";

import SelectOption from "../common/SelectOption";
import { IMovie, IShow, ICinema } from "@/app/types/frontend";
import apiShow from "@/apis/show";
import Notice from "../common/Notice";

interface IProps {
  movies: IMovie[];
}

const BoxFastBooking: React.FC<IProps> = ({ movies }) => {
  const router = useRouter();

  const [currentMovie, setCurrentMovie] = useState<string>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [cinemas, setCinemas] = useState<
    { cinema: { id: number; name: string } }[]
  >([]);
  const [currentCinema, setCurrentCinema] = useState<string>();
  const [listDates, setListDates] = useState<{ timeStart: string }[]>([]);
  const [currentDate, setCurrentDate] = useState<string>();
  const [shows, setShows] = useState<
    { id: number; timeStart: Date; movie: { slug: string } }[]
  >([]);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  // handle change current movie
  const handleChangeMovie = useCallback(
    async (value: string) => {
      if (value !== "0") {
        const cinemas = await apiShow.getCinemaByMovieId(Number(value));
        setCurrentIndex(1);
        setCinemas(cinemas.data);
        setCurrentMovie(value);
      } else {
        setCurrentIndex(0);
        setCurrentCinema("0");
        setCurrentDate("0");
        setShows([]);
      }
    },
    [currentIndex, currentCinema]
  );

  // handle choose cinema
  const handleChooseCinema = useCallback(
    async (value: string) => {
      if (value !== "0") {
        const listDates = await apiShow.getDateFastBooking(
          Number(currentMovie),
          Number(value)
        );
        setCurrentCinema(value);
        setCurrentIndex(2);

        // filter the same date
        const newData: any = [];
        listDates.data.forEach((item: { timeStart: Date }) => {
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

        setListDates(newData);
      } else {
        setCurrentCinema("0");
        setCurrentIndex(1);
        setCurrentDate("0");
        setShows([]);
      }
    },
    [currentMovie, currentIndex]
  );

  // handle choose date
  const handleChooseDate = useCallback(
    async (value: string) => {
      if (value !== "0") {
        const shows = await apiShow.getShowFastBooking(
          Number(currentMovie),
          Number(currentCinema),
          value
        );
        if (shows.success) {
          setShows(shows.data);
        }
        setCurrentDate(value);
      } else {
        setCurrentDate("0");
        setShows([]);
      }
    },
    [currentIndex, currentMovie, currentCinema]
  );

  // handle choose show
  const handleChooseShow = (id: number, slug: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(`/booking/${slug}`);
      localStorage.setItem("currentShow", JSON.stringify(id));
    } else {
      setShowWarning(true);
    }
  };

  const handleCloseWarning = useCallback(() => {
    setShowWarning(false);
  }, [showWarning]);

  return (
    <div className="rounded-sm overflow-hidden">
      {showWarning && (
        <Notice
          text={"Vui lòng thực hiện đăng nhập để có thể đặt vé"}
          onClose={handleCloseWarning}
        />
      )}

      <header className="bg-forcus text-white text-[18px] font-bold py-4 text-center">
        Mua Vé Nhanh
      </header>
      <div className="bg-[#F8F8F8] p-4 border-gray-300 border flex flex-col gap-6">
        <SelectOption
          title={"Chọn phim"}
          data={movies?.map((item) => ({
            id: 1,
            name: item.name,
            value: item.id.toString(),
          }))}
          widthFull
          onChange={handleChangeMovie}
        />

        <SelectOption
          title={"Chọn rạp"}
          data={cinemas?.map((item) => ({
            id: item.cinema.id,
            name: item.cinema.name,
            value: item.cinema.id?.toString(),
          }))}
          widthFull
          disabled={currentIndex < 1}
          value={currentCinema}
          onChange={handleChooseCinema}
        />

        <SelectOption
          title={"Chọn ngày"}
          data={listDates?.map((item) => ({
            id: Number(item.timeStart),
            name: moment(item.timeStart).format("DD/MM/yyyy"),
            value: moment(item.timeStart).format("yyyy/MM/DD"),
          }))}
          value={currentDate}
          widthFull
          disabled={currentIndex < 2}
          onChange={handleChooseDate}
        />

        <div>
          {shows.length !== 1 && (
            <ul className="flex gap-4 items-center flex-wrap">
              {shows?.map((item) => (
                <li
                  key={item.id}
                  onClick={() => handleChooseShow(item.id, item.movie.slug)}
                  className="text-[#333333] text-[14px] px-3 py-2 border border-gray-200 rounded-sm inline-block cursor-pointer hover:text-white hover:bg-forcus transition-all"
                >
                  {moment(item.timeStart).format("HH:mm")}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoxFastBooking;
