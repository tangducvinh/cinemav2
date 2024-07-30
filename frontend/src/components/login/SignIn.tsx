"use client";

import Image from "next/image";
import { useForm, SubmitHandler, UseFormRegister, Path } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

import logo from "../../assets/logo.png";
import InputLogin from "./InputLogin";
// import { isBoolean } from "util";
import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";

interface IDataForm {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: Path<IFormSignIn>;
  maxLength: number;
  regex: RegExp;
  textLength: string;
  textRegex: string;
}

const dataForm: IDataForm[] = [
  {
    label: "Email",
    type: "text",
    placeholder: "Nhập Email",
    required: true,
    name: "email",
    maxLength: 200,
    regex: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i,
    textLength: "Số lượng kí tự không quá 200",
    textRegex: "Vui lòng nhập đúng định dạng email",
  },
  {
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập Mật Khẩu",
    required: true,
    name: "password",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
];

interface IProps {
  onCloseLogin: (x: boolean) => void;
}

const SignIn = (props: IProps) => {
  const { onCloseLogin } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormSignIn>();

  const onSubmit: SubmitHandler<IFormSignIn> = (data) => {
    console.log(data);
  };

  return (
    <section className="w-screen flex items-center justify-center h-screen inset-0 z-40 fixed bg-bg-overlay">
      <div className="w-main-lg bg-white px-[24px] py-[40px] rounded-md relative">
        <button
          onClick={() => onCloseLogin(false)}
          className="absolute top-[12px] right-[12px] opacity-70 hover:opacity-90"
        >
          <IoMdCloseCircle size="30" color="gray" />
        </button>
        <Image
          src={logo}
          className="w-[100px] h-[100px] m-auto"
          alt="avatar"
        ></Image>

        <p className="text-[20px] text-normal mt-2 font-bold text-center">
          Đăng Nhập Tài Khoản
        </p>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          {dataForm.map((item, index) => (
            <InputLogin
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
            className="w-full text-white bg-[#F05A27] transition-all hover:bg-main text-[15px] py-[10px] font-semibold rounded-md mt-4"
          >
            ĐĂNG NHẬP
          </button>

          <button className="text-[#212529] text-[16px] mt-5">
            Quên mật khẩu?
          </button>

          <div className="h-[2px] bg-gray-200 w-full mt-5"></div>

          <p className="text-[16px] text-normal mt-5 text-center">
            Bạn chưa có tài khoản?
          </p>

          <button className="border-2 border-main w-full text-[16px] transition-all hover:text-white hover:bg-main text-main py-[8px] rounded-md">
            Đăng ký
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
