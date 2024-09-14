"use client";

import { useState, useEffect, memo } from "react";
import clsx from "clsx";

import apiSeat from "@/apis/seat";
import { ISeatSelected } from "@/app/types/frontend";
import Loading from "../common/Loading";
import { TbInnerShadowBottomLeftFilled } from "react-icons/tb";

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
  "N",
  "O",
];

interface IProps {
  roomId: number;
  maxColumn: number;
  maxRow: number;
  selectSeats: ISeatSelected[];
  handleSelectSeat: (x: any) => void;
  showId: number | undefined;
}

const MapSeat: React.FC<IProps> = ({
  roomId,
  maxColumn,
  maxRow,
  selectSeats,
  handleSelectSeat,
  showId,
}) => {
  const [dataListSeat, setDateListSeat] = useState<any>([]);
  const [dataOrderedSeat, setDataOrderedSeat] =
    useState<{ seatId: number }[]>();

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

    if (showId) {
      const fetchListOrderedSeat = async () => {
        const response = await apiSeat.getListOrderedSeat(showId);

        setDataOrderedSeat(response);
      };

      fetchListOrderedSeat();
    }

    fetchListSeat();
  }, [roomId, maxRow, showId]);

  if (dataListSeat.length === 0 || dataOrderedSeat === undefined)
    return (
      <div className="h-[600px]">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white p-4">
      <div className="flex justify-between">
        <div className="w-[22px] text-[#777777] text-[18px] px-2 flex flex-col-reverse">
          {listRows.slice(0, maxRow).map((item) => (
            <p key={item} className="w-full text-center mt-4 h-[22px]">
              {item}
            </p>
          ))}
        </div>

        {maxColumn && (
          <div className="flex-auto flex justify-center px-4">
            <div className="flex flex-col-reverse">
              {dataListSeat?.map((item: any, index: number) => (
                <div key={index} className="flex items-center">
                  {item?.map((subItem: any) => (
                    <button
                      key={subItem.id}
                      disabled={dataOrderedSeat.some(
                        (item) => item.seatId === subItem.id
                      )}
                      onClick={() => handleSelectSeat(subItem)}
                      className={clsx(
                        "w-[22px] h-[22px] ml-2 mt-4 hover:bg-main transition-all hover:text-black rounded-md text-[13px] border-[1px]",
                        {
                          "bg-main text-white hover:text-white":
                            selectSeats.some((item) => item.id === subItem.id),
                        },
                        {
                          "bg-gray-300 text-normal hover:bg-gray-300 hover:cursor-default":
                            dataOrderedSeat?.some(
                              (item) => item.seatId === subItem.id
                            ),
                        },
                        {
                          invisible: subItem.status === 2,
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

        <div className="w-[22px] text-[#777777] text-[18px] px-2 flex flex-col-reverse">
          {listRows.slice(0, maxRow).map((item) => (
            <p key={item} className="w-full text-center mt-4 h-[22px]">
              {item}
            </p>
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
