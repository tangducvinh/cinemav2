import logo from "../../assets/logo.png";
import Image from "next/image";

import NavBar from "./Navbar";
import Profile from "./Profile";

const Header = () => {
  return (
    <header className="w-[1280px] flex items-center py-5">
      <div className="flex-2 ml-6 flex">
        <Image className="w-[75px] h-[75px]" src={logo} alt="logo"></Image>
      </div>

      <div className="flex-auto flex ">
        <NavBar />
      </div>

      <div className="flex-3 flex justify-end">
        <Profile />
      </div>
    </header>
  );
};

export default Header;
