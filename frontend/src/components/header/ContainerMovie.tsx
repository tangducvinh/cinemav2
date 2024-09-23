import { IMovie } from "@/app/types/frontend";
import ListMovie from "./ListMovie";

interface IProps {
  movies: IMovie[];
}

const ContainerMovie: React.FC<IProps> = ({ movies }) => {
  return (
    <div className="absolute top-[40px] left-[-50px] bg-white shadow-md min-w-[694px] px-[24px] py-[16px] z-20 rounded-sm">
      <div className="flex flex-col gap-4">
        <ListMovie data={movies.filter((item) => item.status === "showing")} />
        <ListMovie data={movies.filter((item) => item.status === "soon")} />
        <ListMovie data={movies.filter((item) => item.status === "imax")} />
      </div>
    </div>
  );
};

export default ContainerMovie;
