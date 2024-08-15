"use client";

import { useState } from "react";

import ItemDate from "./ItemDate";

const data = [
  {
    title: "Thứ Sáu",
    date: "16/08",
  },
  {
    title: "Thứ Bảy",
    date: "17/08",
  },
  {
    title: "Chủ Nhật",
    date: "18/08",
  },
];

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

  return (
    <div className="flex mt-6 items-center justify-between border-b-[3px] pb-4 border-b-forcus">
      <div className="px-[44px] flex items-center gap-4">
        {data.map((item, index) => (
          <ItemDate
            index={index}
            key={index}
            title={item.title}
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
            <option value={item.value}>{item.title}</option>
          ))}
        </select>

        <select
          id="countries"
          className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
        >
          {dataCinemas.map((item) => (
            <option value={item.value}>{item.title}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default NavBarDate;
