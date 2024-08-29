import { memo } from "react";
import ItemFood from "./ItemFood";
import { IFood, ISelectedFoods } from "@/app/types/frontend";
import Loading from "../common/Loading";

interface IProps {
  dataFood: IFood[];
  handleSelectedFood: (x: any) => void;
  selectedFood: ISelectedFoods[];
}

const ComboFood: React.FC<IProps> = ({
  dataFood,
  handleSelectedFood,
  selectedFood,
}) => {
  if (!dataFood) return <Loading />;
  return (
    <div className="bg-white mt-[30px] p-4">
      <h3 className="font-semibold text-normal text-[20px] mb-4">Chọn Combo</h3>

      {dataFood?.map((item) => (
        <ItemFood
          key={item.id}
          data={item}
          handleSelectedFood={handleSelectedFood}
          quantity={
            selectedFood?.find((subItem) => item.id === subItem.id)?.quantity ||
            0
          }
        />
      ))}
    </div>
  );
};

export default memo(ComboFood);
