"use client";

import { IActor } from "@/app/types/frontend";
import moment from "moment";

interface IProps {
  actor: IActor;
}

const InforActor: React.FC<IProps> = ({ actor }) => {
  return (
    <div className="flex gap-6">
      <img
        className="w-[255px] rounded-sm"
        src={
          actor?.avatar ||
          "https://www.galaxycine.vn/_next/static/media/not_found.f844bf41.jpg"
        }
      ></img>

      <div>
        <h2 className="text-[28px] text-normal font-bold">{actor?.name}</h2>

        <p className="text-[14px] text-normal">
          {actor?.description || "Đang cập nhật"}
        </p>

        <p className="text-[14px] text-[#777777] mt-5">
          Ngày sinh:{" "}
          <span className="text-[#333333] font-semibold">
            {moment(actor?.birthday)?.format("DD/MM/yyyy") || "Đang nhập nhật"}
          </span>
        </p>
        <p className="text-[14px] text-[#777777] mt-2">
          Chiều cao:{" "}
          <span className="text-[#333333] font-semibold">Đang cập nhật</span>
        </p>
        <p className="text-[14px] text-[#777777] mt-2">
          Quốc tịch:{" "}
          <span className="text-[#333333] font-semibold">
            {actor?.country?.name || "Đang cập nhật"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default InforActor;
