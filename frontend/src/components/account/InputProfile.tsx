"use client";

import moment from "moment";
import FormChangePassword from "./FormChangePassword";
import { useState, useCallback } from "react";

interface IProps {
  label: string | undefined;
  value: string;
  Icon: React.ReactNode;
  type: string;
  isDate: boolean | undefined;
  change: boolean | undefined;
}

const InputProfile: React.FC<IProps> = ({
  label,
  Icon,
  value,
  type,
  change,
  isDate,
}) => {
  const [showChange, setShowChange] = useState(false);

  const handleCloseFormChange = useCallback(() => {
    setShowChange(false);
  }, [showChange]);

  return (
    <div className="flex flex-col relative">
      {showChange && <FormChangePassword onClick={handleCloseFormChange} />}
      <label className="text-[18px] text-normal">{label}</label>
      <input
        disabled={true}
        className="bg-gray-100 mt-1 py-2 px-10 text-[18px] text-gray-500 rounded-md outline-none select-none"
        value={isDate ? moment(value).format("DD/MM/yyyy") : value}
        type={type}
      ></input>
      <div className="absolute text-[18px] text-gray-400 left-2 top-[50%] translate-y-[15%]">
        {Icon}
      </div>

      {change && (
        <p
          onClick={() => setShowChange(true)}
          className="absolute hover:cursor-pointer right-[10px] top-[50%] translate-y-[15%] text-[14px] text-main font-bold"
        >
          Thay đổi
        </p>
      )}
    </div>
  );
};

export default InputProfile;
