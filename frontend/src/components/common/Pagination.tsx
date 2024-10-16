"use client";

import clsx from "clsx";
import {
  MdKeyboardArrowLeft,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { generateNumberPagination } from "@/ultis/pagination";
import { useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface IProps {
  total: number;
}

const Pagination: React.FC<IProps> = ({ total }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  console.log({ total });

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleChoosePage = useCallback(
    (value: string) => {
      router.push(pathname + "?" + createQueryString("page", value));
    },
    [searchParams, pathname]
  );

  return (
    <div className="flex items-center gap-6 mx-auto justify-center mt-10">
      <button
        onClick={() => handleChoosePage("1")}
        disabled={Number(searchParams.get("page") || 1) === 1}
        className={clsx(
          "hover:bg-gray-300 hover:cursor-pointer p-1 rounded-sm",
          {
            "text-gray-400 hover:bg-transparent":
              Number(searchParams.get("page") || 1) === 1,
          }
        )}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        onClick={() =>
          handleChoosePage((Number(searchParams.get("page")) - 1).toString())
        }
        disabled={Number(searchParams.get("page") || 1) === 1}
        className={clsx(
          "hover:bg-gray-300 hover:cursor-pointer p-1 rounded-sm",
          {
            "text-gray-400 hover:bg-transparent":
              Number(searchParams.get("page") || 1) === 1,
          }
        )}
      >
        <MdKeyboardArrowLeft />
      </button>
      {generateNumberPagination(
        total,
        Number(searchParams.get("page") || 1)
      ).map((item) => (
        <button
          key={item}
          onClick={() => handleChoosePage(item.toString())}
          disabled={typeof item !== "number"}
          className={clsx(
            "text-[14px] text-normal px-4 p-1 rounded-sm  transition-all",
            {
              "bg-main text-white":
                item === Number(searchParams.get("page") || 1),
            },
            {
              "hover:bg-main hover:cursor-pointer": typeof item === "number",
            }
          )}
        >
          {item}
        </button>
      ))}
      <button
        onClick={() =>
          handleChoosePage((Number(searchParams.get("page")) + 1).toString())
        }
        disabled={
          Number(searchParams.get("page") || 1) === Math.ceil(total / 10)
        }
        className={clsx(
          "hover:bg-gray-300 hover:cursor-pointer p-1 rounded-sm",
          {
            "text-gray-400 hover:bg-transparent":
              Number(searchParams.get("page") || 1) === Math.ceil(total / 10),
          }
        )}
      >
        <MdKeyboardArrowRight />
      </button>
      <button
        onClick={() => handleChoosePage(Math.ceil(total / 10).toString())}
        disabled={
          Number(searchParams.get("page") || 1) === Math.ceil(total / 10)
        }
        className={clsx(
          "hover:bg-gray-300 hover:cursor-pointer p-1 rounded-sm",
          {
            "text-gray-400 hover:bg-transparent":
              Number(searchParams.get("page") || 1) === Math.ceil(total / 10),
          }
        )}
      >
        <MdKeyboardDoubleArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
