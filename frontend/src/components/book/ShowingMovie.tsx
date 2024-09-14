import MenuTitle from "../home/MenuTitle";
import MovieItemBig from "./MovieItemBig";
import { IMovie } from "@/app/types/frontend";

interface IProps {
  data: IMovie[];
}

const ShowingMovie: React.FC<IProps> = ({ data }) => {
  return (
    <div className="mt-8">
      <MenuTitle title="PHIM ĐANG CHIẾU" />

      {data
        .filter((movie, index) => index < 3)
        .map((item) => (
          <MovieItemBig
            key={item.id}
            backdrop={item.backdrop}
            slug={item.slug}
            name={item.name}
          />
        ))}

      
    </div>
  );
};

export default ShowingMovie;
