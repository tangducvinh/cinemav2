import clsx from "clsx";

interface IProps {
  title: string;
  date: string;
  index: number;
  dateChoose: number;
  onDateChoose: (x: number) => void;
}

const ItemDate: React.FC<IProps> = ({
  title,
  date,
  index,
  dateChoose,
  onDateChoose,
}) => {
  return (
    <div
      onClick={() => onDateChoose(index)}
      className={clsx(
        "flex p-3 rounded-md flex-col hover:cursor-pointer transition-all items-center text-[16px] text-normal",
        { "bg-forcus text-white": index === dateChoose }
      )}
    >
      <p>{title}</p>
      <p>{date}</p>
    </div>
  );
};

export default ItemDate;
