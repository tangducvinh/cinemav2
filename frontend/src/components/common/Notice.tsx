import { memo } from "react";
import { CiWarning } from "react-icons/ci";

interface IProps {
  onClose: () => void;
  text: string;
}

const Warning: React.FC<IProps> = ({ onClose, text }) => {
  return (
    <div className="w-screen h-screen inset-0 z-40 fixed flex justify-center items-center bg-bg-overlay">
      <div className="w-[350px] bg-white min-h-[200px] p-10 flex flex-col gap-4 items-center rounded-md">
        <CiWarning className="text-main" size="60" />
        <h4 className="font-bold text-normal text-[20px]">Thông báo</h4>
        <p className="text-[#333333] text-[16px] text-center">{text}</p>
        <button
          onClick={onClose}
          className="bg-main w-full py-2 text-white font-bold rounded-md hover:cursor hover:opacity-90"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default memo(Warning);
