"use client";

import moment from "moment";

import { convertDay } from "@/ultis/convertDay";
import { ISeatSelected, ISelectedFoods } from "@/app/types/frontend";
import { convertToVND } from "@/ultis/convertToVND";
import { convertArrayToString } from "@/ultis/convert";

interface IProps {
  poster: string;
  name: string;
  cinemaName: string;
  roomName: string;
  timeStart: Date;
  selectSeats: ISeatSelected[];
  selectedFood: ISelectedFoods[];
}

const DetailShow: React.FC<IProps> = ({
  poster,
  name,
  cinemaName,
  roomName,
  timeStart,
  selectSeats,
  selectedFood,
}) => {
  return (
    <div className="mt-10 bg-white rounded-md border-t-[8px] p-4 border-t-main">
      <div className="flex gap-2">
        <div className="flex-1">
          <img src={poster} className="rounded-md" alt="poster"></img>
        </div>

        <div className="flex-2">
          <h3 className="text-normal font-semibold text-[18px]">{name}</h3>

          <p className="text-[16px] mt-2">2D</p>
        </div>
      </div>

      <h2 className="text-[18px] mt-8 font-bold text-normal">
        {cinemaName} - <span className="font-medium">{roomName}</span>
      </h2>

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

      {selectSeats.length !== 0 && (
        <div className="flex items-start text-normal pt-5 pb-3 justify-between text-[16px] mt-4 border-t-gray-400 border-dashed border-t-2">
          <div>
            <p>
              <span className="font-bold">{`${selectSeats.length}x`}</span> Ghế
              đơn
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

      {selectedFood.some((item) => item.quantity !== 0) && (
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
            selectSeats.reduce(
              (total, current) => current.ticketPrice + total,
              0
            ) +
              selectedFood.reduce(
                (total, current) => total + current.price * current.quantity,
                0
              )
          )}
        </p>
      </div>
    </div>
  );
};

export default DetailShow;
