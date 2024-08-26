"use client";

import moment from "moment";

import { convertDay } from "@/ultis/convertDay";

interface IProps {
  poster: string;
  name: string;
  cinemaName: string;
  roomName: string;
  timeStart: Date;
}

const DetailShow: React.FC<IProps> = ({
  poster,
  name,
  cinemaName,
  roomName,
  timeStart,
}) => {
  return (
    <div className="mt-10 bg-white rounded-md border-t-[8px] p-4 border-t-main">
      <div className="flex gap-2">
        <div className="flex-1">
          <img src={poster} alt="poster"></img>
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

      <div className="flex items-center text-normal py-5 justify-between text-[18px] mt-4 border-t-gray-400 border-dashed border-t-2">
        <p className="font-bold">Tổng cộng</p>
        <p className="font-bold text-main">0 đ</p>
      </div>
    </div>
  );
};

export default DetailShow;
