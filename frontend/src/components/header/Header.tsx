import logo from "../../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

import NavBar from "./Navbar";
import Profile from "./Profile";
import apiMovie from "@/apis/movie";

import { apisBanner } from "@/apis/banner";

const Header = async () => {
  const movies = await apiMovie.getListMovie();

  return (
    <header className="w-main flex items-center py-5 ">
      <div className="flex-2 flex">
        <Link href={"/"} className="w-[75px] h-[75px]">
          <Image className="w-full h-full" src={logo} alt="logo"></Image>
        </Link>
      </div>

      <div className="flex-auto flex">
        <NavBar movies={movies?.data?.rows || []} />
      </div>

      <div className="flex-3 flex justify-end">
        <Profile />
      </div>
    </header>
  );
};

export default Header;
