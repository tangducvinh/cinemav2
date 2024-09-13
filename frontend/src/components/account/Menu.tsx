"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const listItem = [
  {
    title: "Lịch Sử Giao Dịch",
    to: "/history",
  },
  {
    title: "Thông Tin Cá Nhân",
    to: "/profile",
  },
  {
    title: "Thông báo",
    to: "/notice",
  },
  {
    title: "Quà Tặng",
    to: "/gift",
  },
  {
    title: "Chính Sách",
    to: "/policy",
  },
];

const Menu = () => {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full border-b-2 pb-2 border-gray-400">
      {listItem.map((item) => (
        <Link
          key={item.title}
          className={`link ${
            pathname === "/account" + item.to
              ? '"relative mx-7 text-forcus relative text-[18px] font-bold"'
              : '"text-[#333333] mx-7 text-[18px] opacity-80 font-bold"'
          }`}
          href={`/account${item.to}`}
        >
          {item.title}
          {pathname === `/account${item.to}` && (
            <div className="absolute w-[50px] h-[2px] bg-forcus left-[50%] translate-x-[-50%] top-[33px]"></div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default Menu;
