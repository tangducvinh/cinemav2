import React from "react";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

interface Iprops {
  data: {
    name: string;
    icon?: React.ReactElement;
    value?: string;
    link?: string;
  }[];
}

interface IItem {
  name: string;
}

const NavChild = (props: Iprops) => {
  const { data } = props;
  const router = useRouter();

  const handleClick = async (value: string | undefined, link?: string) => {
    if (value === "logout") {
      deleteCookie("name");
      // localStorage.removeItem('name')
      localStorage.removeItem("token");
      await fetch(`${process.env.URL_SERVER_API}/user/logout`, {
        method: "POST",
        credentials: "include",
      });
      await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } else if (value === "account") {
      router.push("/account/profile");
    }

    if (link) {
      router.push(link);
    }
  };
  return (
    <ul className="absolute pt-4 rounded-sm bg-white shadow-lg w-[200px] z-40 left-[-50px]">
      {data &&
        data.map((item, index) => (
          <li
            key={index}
            onClick={() => handleClick(item.value, item.link)}
            className="py-2 relative text-normal transition-all text-center hover:bg-[#FFF1E6] hover:text-main hover:cursor-pointer hover:border-l-4 border-main text-[14px]"
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
