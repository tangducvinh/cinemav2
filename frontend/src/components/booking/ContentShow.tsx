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
import Loading from "../common/Loading";
import apiShow from "@/apis/show";
import { useRouter } from "next/navigation";
import Warning from "../common/Notice";
import Payment from "./Payment";
import apisPayment from "@/apis/payment";

interface IProps {
  dataFood: IFood[];
}

interface ISeat {
  id: number;
  ticketPrice: number;
  number: number;
  row: number;
}

interface IDataDetailShow {
  timeStart: Date;
  movieId: number;
  cinemaId: number;
  roomId: number;
  room: { roomId: number; width: number; height: number; name: string };
  movie: { name: string; poster: string };
  cinema: { name: string };
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

const ContentShow: React.FC<IProps> = ({ dataFood }) => {
  const router = useRouter();

  const [selectSeats, setSelectSeats] = useState<ISeatSelected[]>([]);
  const [selectedFood, setSelectedFood] = useState<ISelectedFoods[]>([]);
  const [buyStatus, setBuyStatus] = useState<number>(1);
  const [dataDetailShow, setDataDetailShow] = useState<IDataDetailShow>();
  const [currentShowId, setCurrentShowId] = useState<number>();
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [methodPayment, setMethodPayment] = useState<string>();

  // fetch data detail show
  useEffect(() => {
    if (currentShowId) {
      const fetchDataDetailShow = async () => {
        const response = await apiShow.getDetailShow(Number(currentShowId));

        setDataDetailShow(response);
        console.log(response);
      };
      fetchDataDetailShow();
    }
  }, [currentShowId]);

  // get data from localStorage
  useEffect(() => {
    //get status buy from localStorage
    const statusBuy = localStorage.getItem("buyStatus");
    if (statusBuy) setBuyStatus(JSON?.parse(statusBuy));

    // get current show id from localStorage
    let showId = localStorage.getItem("currentShow");
    if (showId) setCurrentShowId(Number(JSON?.parse(showId)));
  }, []);

  // get data food and seat selected from localStorage
  useEffect(() => {
    if (currentShowId) {
      //get data seats selected from localStorage
      const data = localStorage.getItem("seatSelected");
      if (data) {
        let newData = JSON?.parse(data);
        newData = newData.filter(
          (item: { showId: number }) => item.showId === currentShowId
        );
        setSelectSeats(newData);
        localStorage.setItem("seatSelected", JSON.stringify(newData));
      }

      //get data food selected from localStorage
      const dataFoods = localStorage.getItem("selectedFood");
      let newDataFoods = JSON?.parse(dataFoods || "[]") || [];
      newDataFoods = newDataFoods.filter(
        (item: { showId: number }) => item.showId === currentShowId
      );
      setSelectedFood(newDataFoods);
      localStorage.setItem("selectedFood", JSON.stringify(newDataFoods));
    }
  }, [currentShowId]);

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
            showId: currentShowId,
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
              showId: currentShowId,
            },
          ])
        );
      }
    },
    [selectSeats, currentShowId]
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
              showId: currentShowId,
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
              showId: currentShowId,
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
              showId: currentShowId,
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
  const handleStatusBuy = useCallback(async () => {
    if (buyStatus === 1 && selectSeats.length === 0) {
      setShowWarning(true);

      return;
    } else if (buyStatus === 3) {
      if (methodPayment === "vnpay") {
        let dataPass: any = {};
        console.log(selectSeats);
        console.log(selectedFood);

        let total =
          selectSeats.reduce(
            (total, current) => total + current.ticketPrice,
            0
          ) +
          selectedFood.reduce(
            (total, current) => total + current.quantity * current.price,
            0
          );

        dataPass.amount = total;
        dataPass.userId = 1;
        dataPass.showId = currentShowId;
        dataPass.listSeats = selectSeats.map((item) => ({
          seatId: item.id,
          showId: item.showId,
        }));
        dataPass.listFoods = selectedFood.map((item) => ({
          foodId: item.id,
          quantity: item.quantity,
        }));

        console.log(dataPass);

        const response = await apisPayment.payWiteVNPay(dataPass);

        if (response?.paymentUrl) {
          router.push(response.paymentUrl);
        }
        //////
        return;
      } else {
        return;
      }
    }

    setBuyStatus((prev) => prev + 1);

    // update status buy into localStorage
    localStorage.setItem("buyStatus", JSON.stringify(buyStatus + 1));
  }, [buyStatus, selectSeats, selectedFood, methodPayment]);

  // handle btn back
  const handleBtnBack = useCallback(() => {
    if (buyStatus === 1) {
      router.push("/booking");
    } else {
      setBuyStatus((prev) => prev - 1);
    }
  }, [buyStatus]);

  // handle close warning
  const handleCloseWaring = useCallback(() => {
    setShowWarning(false);
  }, []);

  // show loading
  if (!dataDetailShow) return <Loading fullScreen={true} />;

  return (
    <div className="bg-gray-100">
      {showWarning && <Warning onClose={handleCloseWaring} />}

      <HeaderBooking currentIndex={buyStatus} />

      <div className="w-main mx-auto flex gap-3 pb-[70px] min-h-[800px]">
        <div className="flex-7">
          {buyStatus === 1 && (
            <>
              <ChangeShow
                timeStart={dataDetailShow?.timeStart}
                movieId={dataDetailShow?.movieId}
                cinemaId={dataDetailShow?.cinemaId}
                currentShowId={currentShowId}
                onSetCurrentShowId={setCurrentShowId}
              />

              <MapSeat
                roomId={dataDetailShow?.roomId}
                maxColumn={dataDetailShow?.room.width}
                maxRow={dataDetailShow?.room.height}
                selectSeats={selectSeats}
                handleSelectSeat={handleSelectSeat}
              />
            </>
          )}

          {buyStatus === 2 && (
            <ComboFood
              dataFood={dataFood}
              handleSelectedFood={handleSelectedFood}
              selectedFood={selectedFood}
            />
          )}

          {buyStatus === 3 && (
            <Payment
              methodPayment={methodPayment}
              onSetMethodPayment={setMethodPayment}
            />
          )}
        </div>

        <div className="flex-3">
          <DetailShow
            name={dataDetailShow?.movie.name}
            cinemaName={dataDetailShow?.cinema.name}
            timeStart={dataDetailShow?.timeStart}
            roomName={dataDetailShow?.room.name}
            poster={dataDetailShow?.movie.poster}
            selectSeats={selectSeats}
            selectedFood={selectedFood}
            onBtnBuy={handleStatusBuy}
            onBtnBack={handleBtnBack}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentShow;
