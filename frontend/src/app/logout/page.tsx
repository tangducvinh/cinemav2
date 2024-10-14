"use client";

// import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { deleteCookie } from "cookies-next";
import Loading from "@/components/common/Loading";

const Logout = () => {
  // handle logout
  useEffect(() => {
    const handleLogout = async () => {
      localStorage.removeItem("token");
      await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });

      deleteCookie("name");
      await fetch(`${process.env.URL_SERVER_API}/user/logout`, {
        method: "POST",
        credentials: "include",
      });

      window.location.href = "/";
    };
    handleLogout();
  }, []);

  return (
    <div className="w-screen h-screen bg-white relative">
      <Loading fullScreen />
    </div>
  );
};

export default Logout;
