"use client";

import { PiPlaceholder } from "react-icons/pi";
import { IoMdCloseCircle } from "react-icons/io";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import { useState } from "react";

import InputLogin from "../login/InputLogin";
import {
  IFormChangePassword,
  IFormSignIn,
  IFormSignUp,
} from "@/app/types/frontend";
import { GiToken } from "react-icons/gi";
import apiUser from "@/apis/user";

const data = [
  {
    label: "Mật khẩu hiện tại",
    type: "password",
    placeholder: "Nhập Mật Khẩu hiện tại",
    required: true,
    name: "currentPassword",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
  {
    label: "Mật khẩu mới",
    type: "password",
    placeholder: "Nhập Mật Khẩu mới",
    required: true,
    name: "newPassword",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
  {
    label: "Xác nhận mật khẩu mới",
    type: "password",
    placeholder: "Xác nhận mật khẩu mới",
    required: true,
    name: "againNewPassword",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
];

interface IProps {
  onClick: () => void;
}

const FormChangePassword: React.FC<IProps> = ({ onClick }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormChangePassword | IFormSignIn | IFormSignUp>();

  const [message, setMessage] = useState<string>("");

  const onSubmit = async (data: any) => {
    console.log(data);
    if (data.newPassword !== data.againNewPassword) {
      setMessage("Xác nhận mật khẩu mới không trùng khớp");
    } else if (data.newPassword === data.currentPassword) {
      setMessage("Mật khẩu mới trùng với mật khẩu cũ");
    } else {
      let token = localStorage.getItem("token");
      if (token) token = JSON?.parse(token);

      const response = await apiUser.changePassword(token || undefined, {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      if (response.success) {
        onClick();
      } else {
        setMessage(response.message);
      }
    }
  };

  return (
    <div className="w-screen h-screen fixed inset-0 bg-bg-overlay z-10 flex items-center justify-center">
      <div className="bg-white w-[375px] relative rounded-md p-6">
        <h2 className="text-[18px] text-normal font-bold text-center">
          Chỉnh sửa mật khẩu
        </h2>

        <p className="text-[14px] text-red-500 text-center my-2">{message}</p>

        <IoMdCloseCircle
          className="absolute text-gray-300 right-[10px] top-[10px] hover:cursor-pointer hover:opacity-85"
          size="30"
          onClick={onClick}
        />

        <form onSubmit={handleSubmit(onSubmit)}>
          {data.map((item: any) => (
            <InputLogin
              key={item.label}
              register={register}
              label={item.label}
              type={item.type}
              placeholder={item.placeholder}
              required={item.required}
              name={item.name}
              errors={errors}
              maxLength={item.maxLength}
              regex={item.regex}
              textLength={item.textLength}
              textRegex={item.textRegex}
            />
          ))}

          <button
            type="submit"
            className="text-white font-[16px] bg-main py-2 w-full mt-4 rounded-md"
          >
            CẬP NHẬT MẬT KHẨU MỚI
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormChangePassword;
