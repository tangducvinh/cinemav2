"use client";

import { useState, useEffect } from "react";

import ItemDate from "./ItemDate";
import { convertDay } from "@/ultis/convertDay";

interface IDataDate {
  title?: string;
  date: string;
}

const dataCitys = [
  {
    title: "Toàn quốc",
    value: "",
  },
  {
    title: "Đà Nẵng",
    value: "danang",
  },
  {
    title: "TP Hồ Chí Minh",
    value: "hochiminh",
  },
  {
    title: "Hà Nội",
    value: "hanoi",
  },
];

const dataCinemas = [
  {
    title: "Tất cả các rạp",
    value: "",
  },
  {
    title: "Galaxy Liên Chiểu",
    value: "lienchieu",
  },
  {
    title: "Galaxy Hải Châu",
    value: "haichau",
  },
];

const NavBarDate = () => {
  const [dateChoose, setDateChoose] = useState<number>(0);
  const [dataDate, setDataDate] = useState<IDataDate[]>([]);

  useEffect(() => {
    const array: IDataDate[] = [];

    for (let i = 0; i < 3; i++) {
      const now = new Date();
      const current = new Date(now.setDate(now.getDate() + i));
      array.push({
        title: convertDay(current.getDay()),
        date: `${
          current.getDate().toString().length == 1
            ? "0" + current.getDate()
            : current.getDate()
        }:${
          (current.getMonth() + 1).toString().length === 1
            ? "0" + (current.getMonth() + 1)
            : current.getMonth() + 1
        }`,
      });
    }

    setDataDate(array);
  }, []);

  return (
    <div className="flex mt-6 items-center justify-between border-b-[3px] pb-4 border-b-forcus">
      <div className="px-[44px] flex items-center gap-4">
        {dataDate?.map((item, index) => (
          <ItemDate
            index={index}
            key={index}
            title={item.title || ""}
            date={item.date}
            dateChoose={dateChoose}
            onDateChoose={setDateChoose}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <select
          id="countries"
          className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
        >
          {dataCitys.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>

        <select
          id="countries"
          className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
        >
          {dataCinemas.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NavBarDate;
