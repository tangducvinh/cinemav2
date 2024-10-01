interface IProps {
  backdrop: string;
  overview: string;
  name: string;
}

const ItemMovieCinematic: React.FC<IProps> = ({ backdrop, overview, name }) => {
  return (
    <div className="flex items-start gap-3 mt-2">
      <img
        className="w-[255px] h-[170px] object-contain rounded-sm"
        src={backdrop}
        alt={name}
      ></img>

      <div>
        <h3 className="text-[#333333] font-bold text-[18px]">{name}</h3>

        <p className="text-[14px] text-normal line-clamp-3 mt-2">{overview}</p>
      </div>
    </div>
  );
};

export default ItemMovieCinematic;
