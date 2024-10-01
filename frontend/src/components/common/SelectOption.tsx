import internal from "stream";
import clsx from "clsx";

interface IProps {
  title: string;
  data: { id: number; name: string; value: string }[];
  onChange?: (x: string) => void;
  widthFull?: boolean;
}

const SelectOption: React.FC<IProps> = ({
  title,
  data,
  onChange,
  widthFull,
}) => {
  return (
    <select
      onChange={(e) => {
        onChange && onChange(e.target.value);
      }}
      id="countries"
      className={clsx(
        "border text-gray-600 hover:cursor-pointer border-gray-300 outline-none px-2 py-[5px] text-[14px] rounded-sm focus:ring-blue-500 focus:border-blue-500 block",
        { "w-[170px]": !widthFull },
        { "w-full": widthFull }
      )}
    >
      <option value={"0"}>{title}</option>
      {data?.map((item) => (
        <option key={item.id} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
