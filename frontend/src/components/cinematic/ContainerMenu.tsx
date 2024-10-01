"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // handle generate years
  useEffect(() => {
    const years = [];
    for (let i = 2011; i <= Number(new Date().getFullYear()); i++) {
      years.push({ id: i, name: i.toString(), value: i.toString() });
    }
    setYears(years.reverse());
  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === "0") {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleChangeGenre = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("genre", value));
    },
    [searchParams, pathname]
  );

  const handleChangeYear = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("year", value));
    },
    [searchParams, pathname]
  );

  const handleChangeStatus = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("status", value));
    },
    [searchParams, pathname]
  );

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
        onChange={handleChangeYear}
      />

      <SelectOption
        title={"Đang Chiếu/ Sắp"}
        data={status}
        //   onChange={() => {}}
        onChange={handleChangeStatus}
      />
    </div>
  );
};

export default ContainerMenu;
