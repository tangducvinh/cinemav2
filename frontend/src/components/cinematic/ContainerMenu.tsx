"use client";

import { useEffect, useState, useCallback } from "react";
import SelectOption from "../common/SelectOption";
import { IGenre } from "@/app/types/frontend";

const status = [
  {
    id: 1,
    name: "Đang chiếu",
    value: "showing",
  },
  {
    id: 2,
    name: "Sắp chiếu",
    value: "soon",
  },
];

interface IProps {
  genres: IGenre[];
}

const ContainerMenu: React.FC<IProps> = ({ genres }) => {
  const [years, setYears] = useState<
    {
      id: number;
      name: string;
      value: string;
    }[]
  >([]);
  const [currentGenre, setCurrentGenre] = useState<string | null>();

  // handle generate years
  useEffect(() => {
    const years = [];
    for (let i = 2011; i <= Number(new Date().getFullYear()); i++) {
      years.push({ id: i, name: i.toString(), value: i.toString() });
    }
    setYears(years.reverse());
  }, []);

  const handleChangeGenre = useCallback(
    (value: string) => {
      setCurrentGenre(value);

      // here to set url
    },
    [currentGenre]
  );

  console.log({ currentGenre });

  return (
    <div className="mt-4 flex gap-3 items-center border-b-2 border-forcus pb-4">
      <SelectOption
        title={"Thể Loại"}
        data={genres.map((item) => ({
          id: item.id,
          name: item.name,
          value: item.slug,
        }))}
        onChange={handleChangeGenre}
      />

      <SelectOption
        title={"Năm"}
        data={years}
        //   onChange={() => {}}
        onChange={handleChangeGenre}
      />

      <SelectOption
        title={"Đang Chiếu/ Sắp"}
        data={status}
        //   onChange={() => {}}
        onChange={handleChangeGenre}
      />
    </div>
  );
};

export default ContainerMenu;
