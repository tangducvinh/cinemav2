"use client";

import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

import SignUp from "../login/SignUp";
import SignIn from "../login/SignIn";

const Profile = () => {
  const [showLogin, setShowLogin] = useState<boolean>(false);
  return (
    <div className="flex gap-6 relative">
      <button>
        <IoSearchSharp size="22" color="gray" />
      </button>

      <button
        onClick={() => setShowLogin(true)}
        className="text-[#777777] hover:text-main transition-all cursor-pointer"
      >
        Đăng nhập
      </button>

      {showLogin && <SignIn />}
    </div>
  );
};

export default Profile;
