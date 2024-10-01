"use client";

import MenuTitle from "../home/MenuTitle";
import ContainerMenu from "./ContainerMenu";
import ItemMovieCinematic from "./ItemMovieCinematic";
import DescriptionCinematic from "./DescriptionCinematic";
import BoxFastBooking from "./BoxFastBooking";
import ShowingMovie from "../book/ShowingMovie";
import ButtonWatchMore from "../common/ButtonWatchMore";
import { IGenre, IMovie } from "@/app/types/frontend";
import { MdOutlineDevicesFold } from "react-icons/md";

interface IProps {
  genres: IGenre[];
  movies: IMovie[];
  moviesShowing: IMovie[];
}

const ContentCinematic: React.FC<IProps> = ({
  genres,
  movies,
  moviesShowing,
}) => {
  // console.log(searchParams);
  return (
    <div className="pb-10">
      <div className="flex gap-6">
        <div className="flex-7">
          <MenuTitle title={"PHIM ĐIỆN ẢNH"} />

          <ContainerMenu genres={genres} />

          {movies?.length === 0 ? (
            <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
              Không có bài viết nào
            </div>
          ) : (
            <ul className="mt-8">
              {movies?.map((item) => (
                <ItemMovieCinematic
                  key={item.id}
                  backdrop={item.backdrop}
                  name={item.name}
                  overview={item.overview}
                />
              ))}
            </ul>
          )}
        </div>

        <div className="flex-3">
          <BoxFastBooking movies={movies} />

          <ShowingMovie data={moviesShowing} />

          <div className="flex justify-end mt-4">
            <ButtonWatchMore />
          </div>
        </div>
      </div>

      <DescriptionCinematic />
    </div>
  );
};

export default ContentCinematic;
