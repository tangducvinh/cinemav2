import React from "react";
import { deleteCookie } from "cookies-next";

interface Iprops {
  data: { name: string; icon?: React.ReactElement; value?: string }[];
}

interface IItem {
  name: string;
}

const NavChild = (props: Iprops) => {
  const { data } = props;

  const handleClick = (value: string | undefined) => {
    if (value === "logout") {
      deleteCookie("name");
      deleteCookie("token");
    }
  };
  return (
    <ul className="absolute pt-4 rounded-sm bg-white shadow-lg w-[200px] z-40 left-[-50px]">
      {data &&
        data.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item.value)}
            className="py-2 relative text-normal transition-all text-center hover:bg-[#FFF1E6] hover:text-main hover:cursor-pointer hover:border-l-4 border-main"
          >
            <i className="absolute left-[30px] top-[50%] translate-y-[-50%]">
              {item.icon}
            </i>
            {item.name}
          </li>
        ))}
    </ul>
  );
};

export default NavChild;
