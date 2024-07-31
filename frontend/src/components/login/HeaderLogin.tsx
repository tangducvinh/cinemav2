import Image from "next/image";
import { IoMdCloseCircle } from "react-icons/io";
import logo from "../../assets/logo.png";

interface IProps {
  onCloseLogin: (x: string) => void;
}

const HeaderLogin = (props: IProps) => {
  const { onCloseLogin } = props;
  return (
    <div>
      <button
        onClick={() => onCloseLogin("null")}
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
    </div>
  );
};

export default HeaderLogin;
