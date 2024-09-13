"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import Link from "next/link";

import ButtonBuy from "../common/ButtonBuy";
// import SignIn from "../login/SignIn";

interface IProps {
  backdrop: string;
  name: string;
  slug: string;
}

const MovieItemBig: React.FC<IProps> = ({ backdrop, name, slug }) => {
  const [hoverImg, setHoverImg] = useState<boolean>(false);
  // const [showLogin, setShowLogin] = useState<string>("null");

  // const router = useRouter();

  // const handleCheckLogin = () => {
  //   let token = localStorage.getItem("token");
  //   if (token) token = JSON.parse(token);
  //   if (token) {
  //     router.push(`/book/${slug}`);
  //   } else {
  //     setShowLogin("login");
  //   }
  // };

  return (
    <Link href={`/book/${slug}`}>
      <div
        onMouseEnter={() => setHoverImg(true)}
        onMouseLeave={() => setHoverImg(false)}
        className="mt-6 relative w-full rounded-md overflow-hidden hover:cursor-pointer"
      >
        <img src={backdrop} alt="backdrop" className="w-full h-full"></img>

        {hoverImg && (
          <div className="w-full absolute animate-wiggle inset-0 bg-bg-overlay flex items-center justify-center">
            <ButtonBuy />
          </div>
        )}
      </div>

      <p className="mt-2 text-overlay text-[16px] font-semibold">{name}</p>
    </Link>
  );
};

export default MovieItemBig;
