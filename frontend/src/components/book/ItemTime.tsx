interface IProps {
  title: string;
  slug?: string;
}

const ItemTime: React.FC<IProps> = ({ title, slug }) => {
  return (
    <div className="text-[16px] hover:bg-forcus hover:text-white transition-all rounded-sm hover:cursor-pointer text-overlay py-2 px-8 border-[1px] border-gray-200">
      {title}
    </div>
  );
};

export default ItemTime;
