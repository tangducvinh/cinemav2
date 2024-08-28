"use client";

import { useState, useEffect, useCallback } from "react";

import HeaderBooking from "./HeaderBooking";
import ChangeShow from "@/components/booking/ChangeShow";
import DetailShow from "@/components/booking/DetailShow";
import MapSeat from "@/components/booking/MapSeat";
import { ISeatSelected } from "@/app/types/frontend";
import ComboFood from "./ComboFood";
import { IFood } from "@/app/types/frontend";
import { ISelectedFood, ISelectedFoods } from "@/app/types/frontend";

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
  dataFood: IFood[];
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

const ContentShow: React.FC<IProps> = ({ detailShow, slug, dataFood }) => {
  const [selectSeats, setSelectSeats] = useState<ISeatSelected[]>([]);
  const [selectedFood, setSelectedFood] = useState<ISelectedFoods[]>([]);
  const [buyStatus, setBuyStatus] = useState<number>(1);

  // get data from localStorage
  useEffect(() => {
    //get data seats selected from localStorage
    const data = localStorage.getItem("seatSelected");
    let newData = JSON?.parse(data || "[]") || [];
    newData = newData.filter(
      (item: { showId: number }) => item.showId === slug
    );
    setSelectSeats(newData);
    localStorage.setItem("seatSelected", JSON.stringify(newData));

    //get data food selected from localStorage
    const dataFoods = localStorage.getItem("selectedFood");
    let newDataFoods = JSON?.parse(dataFoods || "[]") || [];
    newDataFoods = newDataFoods.filter(
      (item: { showId: number }) => item.showId === slug
    );
    setSelectedFood(newDataFoods);
    localStorage.setItem("selectedFood", JSON.stringify(newDataFoods));

    //get status buy from localStorage
    const statusBuy = localStorage.getItem("buyStatus");
    setBuyStatus(JSON?.parse(statusBuy || "1") || 1);
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

  // handle selected food
  const handleSelectedFood = useCallback(
    (data: ISelectedFood) => {
      const currentItem = selectedFood.find((item) => item.id === data.id);
      if (data.status === "minus") {
        if (!currentItem) {
          return;
        } else if (currentItem.quantity === 0) {
          let newData = selectedFood;
          newData = newData.filter((item) => item.id !== data.id);
          setSelectedFood([...newData]);

          // update localStorage
          localStorage.setItem("selectedFood", JSON.stringify([...newData]));
        } else {
          const newQuantity = currentItem.quantity - 1;
          let newData = selectedFood;
          newData = newData.filter((item) => item.id !== data.id);
          newData = [
            ...newData,
            {
              name: data.name,
              id: data.id,
              price: data.price,
              quantity: newQuantity,
              showId: slug,
            },
          ];
          setSelectedFood(newData);

          // update localStorage
          localStorage.setItem("selectedFood", JSON.stringify(newData));
        }
      } else {
        if (!currentItem) {
          let newData = [
            ...selectedFood,
            {
              name: data.name,
              id: data.id,
              price: data.price,
              quantity: 1,
              showId: slug,
            },
          ];
          setSelectedFood(newData);

          // update localStorage
          localStorage.setItem("selectedFood", JSON.stringify(newData));
        } else {
          const newQuantity = currentItem.quantity + 1;
          let newData = selectedFood;
          newData = newData.filter((item) => item.id !== data.id);
          newData = [
            ...newData,
            {
              name: data.name,
              id: data.id,
              price: data.price,
              quantity: newQuantity,
              showId: slug,
            },
          ];
          setSelectedFood(newData);

          // update localStorage
          localStorage.setItem("selectedFood", JSON.stringify(newData));
        }
      }
    },
    [selectedFood]
  );

  // set status buy
  const handleStatusBuy = () => {
    setBuyStatus((prev) => prev + 1);

    // update status buy into localStorage
    localStorage.setItem("buyStatus", JSON.stringify(buyStatus + 1));
  };

  return (
    <>
      <HeaderBooking currentIndex={buyStatus} />

      <div className="w-main mx-auto flex gap-3 pb-[70px] min-h-[800px]">
        <div className="flex-7">
          {buyStatus === 1 ? (
            <>
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
            </>
          ) : (
            <ComboFood
              dataFood={dataFood}
              handleSelectedFood={handleSelectedFood}
              selectedFood={selectedFood}
            />
          )}
        </div>

        <div className="flex-3">
          <DetailShow
            name={detailShow.movie.name}
            cinemaName={detailShow.cinema.name}
            timeStart={detailShow.timeStart}
            roomName={detailShow.room.name}
            poster={detailShow.movie.poster}
            selectSeats={selectSeats}
            selectedFood={selectedFood}
          />

          <div className="flex mt-8">
            <button className="text-[18px] flex-1 py-2 text-main">
              Quay lại
            </button>

            <button
              onClick={handleStatusBuy}
              className="text-[18px] text-white flex-1 rounded-md py-2 bg-main hover:opacity-85"
            >
              Tiếp tục
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContentShow;
