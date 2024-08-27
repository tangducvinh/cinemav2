"use client";

import { useState, useEffect, useCallback } from "react";

import ChangeShow from "@/components/booking/ChangeShow";
import DetailShow from "@/components/booking/DetailShow";
import MapSeat from "@/components/booking/MapSeat";
import { ISeatSelected } from "@/app/types/frontend";

interface IProps {
  detailShow: {
    timeStart: Date;
    movieId: number;
    cinemaId: number;
    roomId: number;
    room: { roomId: number; width: number; height: number; name: string };
    movie: { name: string; poster: string };
    cinema: { name: string };
  };
  slug: number;
}

interface ISeat {
  id: number;
  ticketPrice: number;
  number: number;
  row: number;
}

const listRows = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
];

const ContentShow: React.FC<IProps> = ({ detailShow, slug }) => {
  const [selectSeats, setSelectSeats] = useState<ISeatSelected[]>([]);

  //get data seats selected from localStorage
  useEffect(() => {
    const data = localStorage.getItem("seatSelected");

    let newData = JSON?.parse(data || "[]") || [];
    newData = newData.filter(
      (item: { showId: number }) => item.showId === slug
    );

    setSelectSeats(newData);
    localStorage.setItem("seatSelected", JSON.stringify(newData));
  }, []);

  // handle selected seat
  const handleSelectSeat = useCallback(
    (data: ISeat) => {
      if (selectSeats.some((item) => item.id === data.id)) {
        const a = selectSeats.filter((item) => item.id !== data.id);
        setSelectSeats(a);

        // update localStorage
        localStorage.setItem("seatSelected", JSON.stringify(a));
      } else {
        setSelectSeats((prev) => [
          ...prev,
          {
            id: data.id,
            name: `${listRows[data.row]}${data.number}`,
            ticketPrice: data.ticketPrice,
            showId: slug,
          },
        ]);

        // update localStorage
        localStorage.setItem(
          "seatSelected",
          JSON.stringify([
            ...selectSeats,
            {
              id: data.id,
              name: `${listRows[data.row]}${data.number}`,
              ticketPrice: data.ticketPrice,
              showId: slug,
            },
          ])
        );
      }
    },
    [selectSeats]
  );

  return (
    <div className="w-main mx-auto flex gap-3 pb-[70px]">
      <div className="flex-7">
        <ChangeShow
          timeStart={detailShow.timeStart}
          movieId={detailShow.movieId}
          cinemaId={detailShow.cinemaId}
        />

        <MapSeat
          roomId={detailShow.roomId}
          maxColumn={detailShow.room.width}
          maxRow={detailShow.room.height}
          selectSeats={selectSeats}
          handleSelectSeat={handleSelectSeat}
        />
      </div>

      <div className="flex-3">
        <DetailShow
          name={detailShow.movie.name}
          cinemaName={detailShow.cinema.name}
          timeStart={detailShow.timeStart}
          roomName={detailShow.room.name}
          poster={detailShow.movie.poster}
          selectSeats={selectSeats}
        />

        <div className="flex mt-8">
          <button className="text-[18px] flex-1 py-2 text-main">
            Quay lại
          </button>

          <button className="text-[18px] text-white flex-1 rounded-md py-2 bg-main hover:opacity-85">
            Tiếp tục
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContentShow;
