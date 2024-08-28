import { memo } from "react";
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

import { IFood } from "@/app/types/frontend";
import { convertToVND } from "@/ultis/convertToVND";

interface IProps {
  data: IFood;
  handleSelectedFood: (x: any) => void;
  quantity: number;
}

const ItemFood: React.FC<IProps> = ({ data, handleSelectedFood, quantity }) => {
  // handle button minus
  const handleMinus = () => {
    handleSelectedFood({
      name: data.name,
      price: data.price,
      id: data.id,
      status: "minus",
    });
  };

  // handle button plus
  const handlePlus = () => {
    handleSelectedFood({
      name: data.name,
      price: data.price,
      id: data.id,
      status: "plus",
    });
  };
  return (
    <>
      <div className="flex gap-4 mt-5">
        <img
          className="w-[150px] h-[100px] rounded-md"
          src={data.image}
          alt="banner"
        ></img>

        <div className="text-normal w-full">
          <h4 className="font-semibold text-[16px]">{data.name}</h4>
          <p className="mt-1 text-[14px]">{data.description}</p>
          <div className="flex items-center justify-between">
            <p className="mt-1 font-bold text-[16px]">{`Giá: ${convertToVND(
              data.price
            )}`}</p>

            <div className="flex items-center gap-6 shadow-sm px-4 py-1 rounded-md">
              <FaMinus className="cursor-pointer" onClick={handleMinus} />

              <span className="text-[16px]">{quantity}</span>

              <FaPlus className="cursor-pointer" onClick={handlePlus} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ItemFood);
