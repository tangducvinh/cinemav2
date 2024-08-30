"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

import HeaderBooking from "@/components/booking/HeaderBooking";
import DetailShow from "@/components/booking/DetailShow";

const Booking = () => {
  const router = useRouter();

  const handleBtnBack = useCallback(() => {
    router.push("/");
  }, []);

  return (
    <div className="w-main mx-auto mb-[60px]">
      <HeaderBooking currentIndex={0} />

      <div className="flex">
        <div className="flex-7">hello</div>

        <div className="flex-3">
          <DetailShow onBtnBack={handleBtnBack} />
        </div>
      </div>
    </div>
  );
};

export default Booking;
