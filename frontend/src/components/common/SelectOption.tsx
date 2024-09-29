import internal from "stream";

interface IProps {
  title: string;
  data: { id: number; name: string; value: string }[];
  onChange?: (x: string) => void;
}

const SelectOption: React.FC<IProps> = ({ title, data, onChange }) => {
  return (
    <select
      //   onChange={(e) => onChange(e.target.value)}
      id="countries"
      className="border hover:cursor-pointer border-gray-300 outline-none text-gray-900 p-2 text-[16px] rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[170px]"
    >
      <option value={0}>{title}</option>
      {data?.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectOption;
