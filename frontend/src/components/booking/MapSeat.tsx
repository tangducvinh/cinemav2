"use client";

import { useState, useEffect, memo } from "react";
import clsx from "clsx";

import apiSeat from "@/apis/seat";
import { ISeatSelected } from "@/app/types/frontend";

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

interface IProps {
  roomId: number;
  maxColumn: number;
  maxRow: number;
  selectSeats: ISeatSelected[];
  handleSelectSeat: (x: any) => void;
}

const MapSeat: React.FC<IProps> = ({
  roomId,
  maxColumn,
  maxRow,
  selectSeats,
  handleSelectSeat,
}) => {
  const [dataListSeat, setDateListSeat] = useState<any>([]);

  useEffect(() => {
    const fetchListSeat = async () => {
      const response = await apiSeat.getListSeat(roomId);

      const newData = [];

      for (let i = 0; i < maxRow; i++) {
        const rows = response.filter((item: { row: number }) => item.row === i);
        newData.push(rows);
      }

      setDateListSeat(newData);
    };

    fetchListSeat();
  }, [roomId]);

  return (
    <div className="bg-white p-4 ">
      <div className="flex justify-between">
        <div className="w-[20px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-4">
          {listRows.slice(0, maxRow).map((item) => (
            <p key={item} className="w-full text-center">
              {item}
            </p>
          ))}
        </div>

        {maxColumn && (
          <div className="flex-auto flex justify-center">
            <div className="flex flex-col-reverse">
              {dataListSeat?.map((item: any) => (
                <div className="flex items-center flex-row-reverse">
                  {item?.map((subItem: any) => (
                    <button
                      onClick={() => handleSelectSeat(subItem)}
                      className={clsx(
                        "w-[25px] h-[25px] ml-2 mt-4 hover:bg-main transition-all hover:text-black rounded-md text-sm border-[1px]",
                        {
                          "bg-main text-white hover:text-white":
                            selectSeats.some((item) => item.id === subItem.id),
                        }
                      )}
                    >
                      {subItem.name}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-[20px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-4">
          {listRows.slice(0, maxRow).map((item) => (
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

export default memo(MapSeat);
