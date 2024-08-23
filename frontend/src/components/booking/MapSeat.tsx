"use client";

import { useState } from "react";

const data = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const dataSeat = [
  {
    number: "1",
    row: "0",
    column: "0",
  },
  {
    number: "2",
    row: "0",
    column: "1",
  },
  {
    number: "3",
    row: "0",
    column: "2",
  },
  {
    number: "4",
    row: "0",
    column: "3",
  },
  {
    number: "5",
    row: "0",
    column: "4",
  },
  {
    number: "6",
    row: "0",
    column: "5",
  },
  {
    number: "7",
    row: "0",
    column: "6",
  },
  {
    number: "8",
    row: "0",
    column: "7",
  },
  {
    number: "9",
    row: "0",
    column: "8",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },

  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },
  {
    number: "10",
    row: "0",
    column: "9",
  },

  {
    number: "10",
    row: "0",
    column: "9",
  },
];

const row = 2;
// const column = 17;

const MapSeat = () => {
  const [column, setColumn] = useState<number>(15);

  return (
    <div className="bg-white p-3 relative flex justify-center">
      <div className="absolute w-[20px] left-[10px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-3">
        {data.slice(0, row).map((item) => (
          <p className="w-full text-center">{item}</p>
        ))}
      </div>

      <div className={`grid ${"grid-cols-" + column} mx-[30px]`}>
        {dataSeat.reverse().map((item) => (
          <button className="w-[25px] ml-2 mb-4 hover:bg-main transition-all hover:text-black rounded-md text-sm border-[1px]">
            {item.number}
          </button>
        ))}
      </div>

      <div className="absolute right-[15px] w-[20px] text-[#777777] text-[18px] px-2 flex flex-col-reverse gap-3">
        {data.slice(0, row).map((item) => (
          <p className="w-full text-center">{item}</p>
        ))}
      </div>
    </div>
  );
};

export default MapSeat;
