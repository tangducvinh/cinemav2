"use client";

import clsx from "clsx";
import { useForm, SubmitHandler, Path } from "react-hook-form";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { IoMdClose, IoIosCalendar } from "react-icons/io";
import { ClipLoader } from "react-spinners";
import { setCookie } from "cookies-next";

import apiUser from "../../apis/user";
import InputLogin from "./InputLogin";
import InputRadio from "./InputRadio";
import { IFormSignIn, IFormSignUp } from "@/app/types/frontend";
import HeaderLogin from "./HeaderLogin";
import { useAppContext } from "@/me/AppProvider";

interface IDataForm {
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
  name: Path<IFormSignIn | IFormSignUp>;
  maxLength: number;
  regex: RegExp;
  textLength: string;
  textRegex: string;
}

const dataSignIn: IDataForm[] = [
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

const dataSignUp: IDataForm[] = [
  {
    label: "Họ và tên",
    type: "text",
    placeholder: "Nhập Họ và tên",
    required: true,
    name: "fullName",
    maxLength: 50,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
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
    label: "Số điện thoại",
    type: "text",
    placeholder: "Nhập Số điện thoại",
    required: true,
    name: "phone",
    maxLength: 10,
    regex: /^/,
    textLength: "Số điện thoại phải có 10 số",
    textRegex: "",
  },
  {
    label: "Mật khẩu",
    type: "password",
    placeholder: "Nhập Mật khẩu",
    required: true,
    name: "password",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
  {
    label: "Nhập lại mật khẩu",
    type: "password",
    placeholder: "Nhập lại mật khẩu",
    required: true,
    name: "passwordAgain",
    maxLength: 20,
    regex: /^/,
    textLength: "Số lượng kí tự không quá 20",
    textRegex: "",
  },
];

const dataRadioButton = [
  {
    label: "Nam",
    value: "true",
  },
  {
    label: "Nữ",
    value: "false",
  },
];

interface IProps {
  onCloseLogin: (x: string) => void;
  statusLogin: string;
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const SignIn = (props: IProps) => {
  const { onCloseLogin, statusLogin } = props;
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormSignUp | IFormSignIn>();

  const [dataForm, setDataForm] = useState<IDataForm[]>(dataSignIn);
  const [accept, setAccept] = useState<boolean>(false);
  const [sex, setSex] = useState<string>("true");
  const [dateValue, setDateValue] = useState<Value>(null);
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [checkFillDate, setCheckFillDate] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setMessage("");
    if (statusLogin == "signin") {
      setDataForm(dataSignIn);
    } else {
      setDataForm(dataSignUp);
    }
  }, [statusLogin]);

  useEffect(() => {
    if (dateValue === null) {
      setCheckFillDate(true);
      return;
    } else {
      setCheckFillDate(false);
    }
  }, [dateValue]);

  const { setToken } = useAppContext();

  const onSubmit: SubmitHandler<IFormSignUp | IFormSignIn> = async (
    data: any
  ) => {
    if (statusLogin === "signup") {
      // handle signup
      if (data.password === data.passwordAgain) {
        const newData = { ...data };
        newData.sex = sex;
        newData.birthday = moment(dateValue?.toString()).format("yyyy/MM/DD");

        setLoading(true);
        const response = await apiUser.signUp(newData);
        setLoading(false);

        if (!response.success) {
          setMessage(response.message);
        } else {
          onCloseLogin("signin");
        }
      } else {
        setMessage("Mật khẩu không khớp");
      }
    } else {
      // handle signin
      setLoading(true);
      const response = await apiUser.signIn(data);
      setLoading(false);

      if (!response.success) {
        setMessage(response.message);
      } else {
        onCloseLogin("null");
        const name = response.data.fullName;
        const token = response.data.accessToken;
        // setCookie('token', token)
        setCookie("name", name);

        // set token into cookie client next
        fetch("/api/user", {
          method: "POST",
          body: JSON.stringify(response),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setToken(response.data.accessToken);
      }
    }
  };

  const handleStatusLogin = () => {
    if (statusLogin === "signin") {
      onCloseLogin("signup");
    } else {
      onCloseLogin("signin");
    }
  };

  return (
    <section className="w-screen flex items-center justify-center h-screen inset-0 z-40 fixed bg-bg-overlay">
      <div
        onClick={() => setShowCalendar(false)}
        className="w-main-lg bg-white px-[24px] py-[40px] rounded-md relative"
      >
        <HeaderLogin onCloseLogin={onCloseLogin} />

        <p className="text-center text-red-500 mt-1">{message}</p>

        <form className="mt-5" onSubmit={handleSubmit(onSubmit)}>
          {dataForm.map((item, index) => (
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

          {statusLogin === "signup" && (
            <div className="flex items-center gap-3 mt-3">
              {dataRadioButton.map((item) => (
                <InputRadio
                  key={item.value}
                  onValue={setSex}
                  value={item.value}
                  currentValue={sex}
                  label={item.label}
                />
              ))}
            </div>
          )}

          {statusLogin === "signup" && (
            <div onClick={(e) => e.stopPropagation()} className="relative">
              <label className="text-[#777777] text-[12px]">Ngày sinh</label>
              <input
                type="type"
                placeholder="Ngày/Tháng/Năm"
                onClick={(e) => {
                  setShowCalendar((prev) => !prev);
                  e.stopPropagation();
                }}
                value={
                  dateValue !== null
                    ? moment(dateValue?.toString())
                        .format("DD/MM/yyyy")
                        .toString()
                    : ""
                }
                className="w-full border-[2px] placeholder:text-[16px] p-2 rounded-md outline-none"
              ></input>
              {checkFillDate && (
                <p className="absolute">Vui lòng chọn ngày sinh</p>
              )}
              <div className="flex items-center gap-3 absolute right-[10px] top-[50%] translate-y-[-2%]">
                <IoMdClose
                  onClick={() => setDateValue(null)}
                  className="hover:text-blue-500 transition-all hover:cursor-pointer"
                  size="25px"
                />
                <IoIosCalendar
                  onClick={() => setShowCalendar((prev) => !prev)}
                  className="hover:text-blue-500 hover:cursor-pointer transition-all"
                  size="25px"
                />
              </div>
              {showCalendar && (
                <Calendar
                  className="absolute z-40"
                  onChange={setDateValue}
                  value={dateValue}
                />
              )}
            </div>
          )}

          {statusLogin === "signup" && (
            <div className="flex items-start gap-2 mt-6">
              <input
                className="w-[30px] h-[30px] hover:cursor-pointer"
                type="checkbox"
                onClick={() => setAccept((prev) => !prev)}
              ></input>
              <p className="text-[12px] text-normal font-semibold">
                Bằng việc đăng ký tài khoản, tôi đồng ý với Điều khoản dịch vụ
                và Chính sách bảo mật của Galaxy Cinema.
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={statusLogin === "signup" && !accept ? true : false}
            className={clsx(
              "w-full text-white bg-[#F05A27] uppercase hover:cursor-pointer transition-all text-[15px] h-[45px] font-semibold rounded-md mt-4",
              { "opacity-70": accept === false && statusLogin === "signup" },
              { "hover:bg-main": accept === true || statusLogin === "signin" }
            )}
          >
            {loading ? (
              <div className="flex items-center w-full h-full justify-center">
                <ClipLoader
                  color="#ffffff"
                  loading={true}
                  // cssOverride={override}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : statusLogin === "signin" ? (
              "Đăng nhập"
            ) : (
              "Hoàn thành"
            )}
          </button>

          {statusLogin === "signin" && (
            <button className="text-[#212529] text-[16px] mt-5">
              Quên mật khẩu?
            </button>
          )}

          <div className="h-[2px] bg-gray-200 w-full mt-5"></div>

          <p className="text-[16px] text-normal mt-5 text-center">
            {statusLogin === "signin"
              ? "Bạn chưa có tài khoản?"
              : "Bạn đã có tài khoản?"}
          </p>

          <button
            onClick={handleStatusLogin}
            className="border-2 border-main w-full text-[16px] transition-all hover:text-white hover:bg-main text-main py-[8px] rounded-md"
          >
            {statusLogin === "signin" ? "Đăng ký" : "Đăng nhập"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
