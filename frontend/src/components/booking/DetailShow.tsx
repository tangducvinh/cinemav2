"use client";

import moment from "moment";
import { memo } from "react";

import { convertDay } from "@/ultis/convertDay";
import { ISeatSelected, ISelectedFoods } from "@/app/types/frontend";
import { convertToVND } from "@/ultis/convertToVND";
import { convertArrayToString } from "@/ultis/convert";

interface IProps {
  poster?: string;
  name?: string;
  cinemaName?: string;
  roomName?: string;
  timeStart?: Date;
  selectSeats?: ISeatSelected[];
  selectedFood?: ISelectedFoods[];
  onBtnBuy?: () => void;
  onBtnBack?: () => void;
}

const DetailShow: React.FC<IProps> = ({
  poster,
  name,
  cinemaName,
  roomName,
  timeStart,
  selectSeats,
  selectedFood,
  onBtnBack,
  onBtnBuy,
}) => {
  return (
    <div>
      <div className="mt-10 bg-white rounded-md border-t-[8px] p-4 border-t-main">
        <div className="flex gap-2">
          <div className="flex-1">
            <img
              src={
                poster ||
                "https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg"
              }
              className="rounded-md w-full h-full"
              alt="poster"
            ></img>
          </div>

          <div className="flex-2">
            <h3 className="text-normal font-semibold text-[18px]">{name}</h3>

            {name && <p className="text-[16px] mt-2">2D</p>}
          </div>
        </div>

        {cinemaName && (
          <h2 className="text-[18px] mt-8 font-bold text-normal">
            {cinemaName} - <span className="font-medium">{roomName}</span>
          </h2>
        )}

        {timeStart && (
          <p className="text-[18px] mt-2 text-normal">
            Suất:{" "}
            <span className="font-semibold">
              {moment(timeStart).format("HH:mm")}
            </span>{" "}
            - {convertDay(new Date(timeStart).getDay())},{" "}
            <span className="font-semibold">
              {moment(timeStart).format("DD/MM/yyyy")}
            </span>
          </p>
        )}

        {selectSeats && selectSeats?.length !== 0 && (
          <div className="flex items-start text-normal pt-5 pb-3 justify-between text-[16px] mt-4 border-t-gray-400 border-dashed border-t-2">
            <div>
              <p>
                <span className="font-bold">{`${selectSeats?.length}x`}</span>{" "}
                Ghế đơn
              </p>
              <p>
                Ghế:{" "}
                <span className="font-bold">
                  {convertArrayToString(selectSeats.map((item) => item.name))}
                </span>
              </p>
            </div>
            <div>
              <p className="font-bold">
                {convertToVND(
                  selectSeats.reduce(
                    (total, current) => current.ticketPrice + total,
                    0
                  )
                )}
              </p>
            </div>
          </div>
        )}

        {selectedFood?.some((item) => item.quantity !== 0) && (
          <div className=" text-normal pt-5 pb-3 text-[16px] mt-4 border-t-gray-400 border-dashed border-t-2">
            {selectedFood.map(
              (item) =>
                item.quantity !== 0 && (
                  <div
                    key={item.id}
                    className="flex items-center justify-between"
                  >
                    <p>
                      <span className="font-bold">{`${item.quantity}x`}</span>{" "}
                      {item.name}
                    </p>

                    <p className="font-bold">
                      {convertToVND(item.price * item.quantity)}
                    </p>
                  </div>
                )
            )}
          </div>
        )}

        <div className="flex items-center text-normal py-5 justify-between text-[18px] mt-4 border-t-gray-400 border-dashed border-t-2">
          <p className="font-bold">Tổng cộng</p>
          <p className="font-bold text-main">
            {convertToVND(
              (selectSeats
                ? selectSeats.reduce(
                    (total, current) => current.ticketPrice + total,
                    0
                  )
                : 0) +
                (selectedFood
                  ? selectedFood.reduce(
                      (total, current) =>
                        total + current.price * current.quantity,
                      0
                    )
                  : 0)
            )}
          </p>
        </div>
      </div>

      <div className="flex mt-8">
        <button
          className="text-[18px] flex-1 py-2 text-main"
          onClick={onBtnBack}
        >
          Quay lại
        </button>

        <button
          disabled={onBtnBuy ? false : true}
          onClick={onBtnBuy}
          className="text-[18px] disabled:opacity-50 text-white flex-1 rounded-md py-2 bg-main hover:opacity-85"
        >
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default memo(DetailShow);
