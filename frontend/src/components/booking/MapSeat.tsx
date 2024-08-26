"use client";

import { useState, useEffect } from "react";

import apiSeat from "@/apis/seat";

const data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

interface IProps {
  roomId: number;
  maxColumn: number;
  maxRow: number;
}

interface ISeat {
  id: number;
  name: string;
  number: number;
  row: number;
  column: number;
  status: number;
  ticketPrice: number;
}

const MapSeat: React.FC<IProps> = ({ roomId, maxColumn, maxRow }) => {
  // const [column, setColumn] = useState<number>(14);
  // const [row, setRow] = useState<number>(10);
  const [dataListSeat, setDateListSeat] = useState<ISeat[]>([]);

  useEffect(() => {
    const fetchListSeat = async () => {
      const response = await apiSeat.getListSeat(roomId);

      console.log(maxColumn);

      setDateListSeat(response);
      // setColumn(maxColumn);
      // setRow(maxRow);
    };

    fetchListSeat();
  }, [roomId]);

  return (
    <div className="bg-white p-4 min-h-[600px]">
      <div className="flex justify-between">
        <div className="w-[20px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-3">
          {data.slice(0, maxRow).map((item) => (
            <p className="w-full text-center">{item}</p>
          ))}
        </div>

        {maxColumn && (
          <div className="flex-auto flex justify-center">
            <div className={`grid grid-cols-${maxColumn.toString()} mx-[30px]`}>
              {dataListSeat.reverse().map((item) => (
                <button className="w-[25px] h-[25px] ml-2 mb-4 hover:bg-main transition-all hover:text-black rounded-md text-sm border-[1px]">
                  {item.number}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="w-[20px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-3">
          {data.slice(0, maxRow).map((item) => (
            <p className="w-full text-center">{item}</p>
          ))}
        </div>
      </div>

      <div className="mt-[40px]">
        <p className="text-center text-gray-300 text-semibold mb-2">Màn hình</p>

        <div className="border-t-[4px] border-t-main">
          <div className="flex items-center gap-6 h-[90px]">
            <div className="flex items-center gap-2">
              <div className="w-[25px] h-[25px] rounded-sm bg-gray-400"></div>
              <p className="text-normal text-[16px]">Ghế đã bán</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-[25px] h-[25px] rounded-sm bg-main"></div>
              <p className="text-normal text-[16px]">Ghế đang chọn</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSeat;
