"use client";

import { useState, useEffect } from "react";
import moment from "moment";

import ItemDate from "./ItemDate";
import { convertDay } from "@/ultis/convertDay";
import { ICity, ICinema, IShowSearch } from "@/app/types/frontend";
import apiCinema from "@/apis/cinema";
import Schedule from "./Schedule";
import apiShow from "@/apis/show";

interface IDataDate {
  title?: string;
  date: Date;
}

interface IProps {
  listCities: ICity[] | [];
  movieId: number;
}

const NavBarDate: React.FC<IProps> = ({ listCities, movieId }) => {
  const [dateChoose, setDateChoose] = useState<number>(0);
  const [dataDate, setDataDate] = useState<IDataDate[]>([]);
  const [currentCity, setCurrentCity] = useState<number>(0);
  const [listCinemas, setListCinemas] = useState<ICinema[]>([]);
  const [currentCinema, setCurrentCinema] = useState<number>(0);
  const [dataSchedule, setDataSchedule] = useState<[][]>([]);

  // generate 3 days next
  useEffect(() => {
    const array: IDataDate[] = [];

    for (let i = 0; i < 3; i++) {
      const now = new Date();
      const current = new Date(now.setDate(now.getDate() + i));
      array.push({
        title: convertDay(current.getDay()),
        date: current,
      });
    }

    setDataDate(array);
  }, []);

  // handle filter cinema follow city
  useEffect(() => {
    const fetchListCinema = async () => {
      const listCinemas = await apiCinema.getListCinema(currentCity);

      if (listCinemas.success) {
        setListCinemas(listCinemas?.data);
      }
    };
    if (currentCity === 0) {
      setCurrentCinema(0);
    }

    fetchListCinema();
  }, [currentCity]);

  // handle search show follow condition
  const fetchListShow = async (data: IShowSearch) => {
    console.log(data);
    const response = await apiShow.getListShow(data);

    let newArray: number[] = [];

    response.forEach((item: { cinemaId: number }) => {
      if (!newArray?.some((check) => check === item.cinemaId)) {
        newArray.push(item.cinemaId);
      }
    });

    let newData: [][] = [];
    newArray.forEach((item) => {
      let a = response.filter(
        (value: { cinemaId: number }) => value.cinemaId === item
      );
      newData.push(a);
    });

    setDataSchedule(newData);
  };

  useEffect(() => {
    const data: IShowSearch = {
      date:
        moment(dataDate[dateChoose]?.date).format("yyyy/MM/DD") ||
        moment(new Date()).format("yyyy/MM/DD"),
      movieId,
      cityId: currentCity,
      cinemaId: currentCinema,
    };

    fetchListShow(data);
  }, [dateChoose, movieId, currentCity, currentCinema]);

  return (
    <div>
      <div className="flex mt-6 items-center justify-between border-b-[3px] pb-4 border-b-forcus">
        <div className="px-[44px] flex items-center gap-4">
          {dataDate?.map((item, index) => (
            <ItemDate
              index={index}
              key={index}
              title={item.title || ""}
              date={moment(item.date).format("DD/MM")}
              dateChoose={dateChoose}
              onDateChoose={setDateChoose}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <select
            onChange={(e) => setCurrentCity(Number(e.target.value))}
            id="countries"
            className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
          >
            <option value={0}>Toàn quốc</option>
            {listCities?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          <select
            id="countries"
            className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
            onChange={(e) => setCurrentCinema(Number(e.target.value))}
          >
            <option value={0}>Tất cả các rạp</option>
            {listCinemas?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {dataSchedule.length === 0 ? (
        <div className="h-[300px] mt-8 flex items-center justify-center">
          Không có suất chiếu nào!
        </div>
      ) : (
        <div className="min-h-[300px]">
          {dataSchedule?.map((item, index) => (
            <Schedule data={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavBarDate;
