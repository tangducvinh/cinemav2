import MenuTitle from "../home/MenuTitle";
import { IDetailMovie } from "@/app/types/frontend";

interface IProps {
  overview: string;
}

const ContentMovie: React.FC<IProps> = ({ overview }) => {
  return (
    <div className="mt-[100px]">
      <MenuTitle title="Nội Dung Phim" size="small" />

      <p className="mt-4 text-[15px] text-normal">{overview}</p>
    </div>
  );
};

export default ContentMovie;
