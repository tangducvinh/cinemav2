import { IMovie } from "@/app/types/frontend";

import MovieItem from "./MovieItem";
import Loading from "../common/Loading";

interface IProps {
  data: IMovie[] | [];
}

const MovieContainer = (props: IProps) => {
  const { data } = props;

  if (data?.length === 0) return <Loading />;

  return (
    <div className="grid grid-cols-4 gap-8">
      {data.map((item, index) => (
        <MovieItem
          key={item.id}
          name={item.name}
          poster={item.poster}
          keyVideo={item.video}
          slug={item.slug}
        ></MovieItem>
      ))}
    </div>
  );
};

export default MovieContainer;
