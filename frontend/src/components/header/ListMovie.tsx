import { IMovie } from "@/app/types/frontend";

import MenuTitle from "../home/MenuTitle";
import MovieItem from "../home/MovieItem";

interface IProps {
  data: IMovie[];
}

const ListMovie: React.FC<IProps> = ({ data }) => {
  const matchTitle: any = {
    showing: "PHIM ĐANG CHIẾU",
    soon: "PHIM SẮP CHIẾU",
    imax: "PHIM IMAX",
  };
  return (
    <div className="w-full">
      <MenuTitle size="sm" title={matchTitle[data[0]?.status]} />

      <div className="grid grid-cols-4 gap-6 mt-3">
        {data
          .filter((x, index) => index < 4)
          .map((item) => (
            <MovieItem
              key={item.id}
              hiddenTrailer={true}
              name={item.name}
              poster={item.poster}
              slug={item.slug}
              keyVideo={item.video}
              size="sm"
            />
          ))}
      </div>
    </div>
  );
};

export default ListMovie;
