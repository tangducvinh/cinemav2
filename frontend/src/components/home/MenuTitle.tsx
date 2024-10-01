import clsx from "clsx";

interface IProps {
  title: string;
  size?: string;
}

const MenuTitle = (props: IProps) => {
  const { title, size } = props;
  return (
    <h1
      className={clsx(
        "border-l-[5px] border-forcus px-3 leading-6 mr-8 text-normal font-bold",
        { "text-[16px]": size === "small" },
        { "text-[20px]": size === undefined }
      )}
    >
      {title}
    </h1>
  );
};

export default MenuTitle;
