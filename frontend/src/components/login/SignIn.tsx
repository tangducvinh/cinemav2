"use client";

import Image from "next/image";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";

import logo from "../../assets/logo.png";
import InputLogin from "./InputLogin";

interface Inputs {
  //   example: string;
  //   exampleRequired: string;
}

const dataForm = [
  {
    label: "Email",
    placeholder: "Nhập Email",
  },
  {
    label: "Mật khẩu",
    placeholder: "Nhập Mật Khẩu",
  },
];

const SignIn = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <section className="w-screen flex items-center justify-center h-screen inset-0 z-40 fixed bg-bg-overlay">
      <div className="w-main-lg bg-white px-[24px] py-[40px] rounded-md relative">
        <button className="absolute top-[12px] right-[12px] opacity-70 hover:opacity-90">
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
          {/* register your input into the hook by invoking the "register" function */}
          {/* <input defaultValue="test" {...register("example")} /> */}

          {/* include validation with required or other standard HTML validation rules */}
          {/* <input {...register("exampleRequired", { required: true })} /> */}
          {/* errors will return when field validation fails  */}
          {/* {errors.exampleRequired && <span>This field is required</span>} */}

          {/* <input type="submit" /> */}

          <InputLogin />
          <InputLogin />

          <button className="w-full text-white bg-[#F05A27] transition-all hover:bg-main text-[15px] py-[10px] font-semibold rounded-md mt-4">
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
