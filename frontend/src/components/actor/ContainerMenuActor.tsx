"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import SelectOption from "../common/SelectOption";
import { ICountry } from "@/app/types/frontend";

interface IProps {
  countries: ICountry[];
}

const ContainerMenuActor: React.FC<IProps> = ({ countries }) => {
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

  const handleChangeCountry = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("country", value));
    },
    [searchParams, pathname]
  );

  return (
    <div className="mt-4 flex gap-3 items-center border-b-2 border-forcus pb-4">
      <SelectOption
        title={"Quốc gia"}
        data={countries.map((item) => ({
          id: item.id,
          name: item.name,
          value: item.slug,
        }))}
        onChange={handleChangeCountry}
      />
    </div>
  );
};

export default ContainerMenuActor;
