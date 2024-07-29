interface IProps {
  title: string;
}

const MenuTitle = (props: IProps) => {
  const { title } = props;
  return (
    <h1 className="border-l-[5px] border-forcus px-3 leading-6 mr-8 text-normal font-bold text-[22px]">
      {title}
    </h1>
  );
};

export default MenuTitle;
