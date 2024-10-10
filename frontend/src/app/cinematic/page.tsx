import apiGenre from "@/apis/genre";
import apiMovie from "@/apis/movie";

import MenuTitle from "@/components/home/MenuTitle";
import ContainerMenu from "@/components/cinematic/ContainerMenu";
import ItemMovieCinematic from "@/components/cinematic/ItemMovieCinematic";

const Cinematic = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const moviesData = apiMovie.getListMovie(searchParams);
  const genresData = apiGenre.getListGenres();

  const [genres, movies] = await Promise.all([genresData, moviesData]);

  return (
    <div>
      <MenuTitle title={"PHIM ĐIỆN ẢNH"} />

      <ContainerMenu genres={genres.data} />

      {movies?.data?.length === 0 ? (
        <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
          Không có bài viết nào
        </div>
      ) : (
        <ul className="mt-8">
          {movies?.data?.rows.map((item: any) => (
            <ItemMovieCinematic
              key={item.id}
              backdrop={item.backdrop}
              name={item.name}
              overview={item.overview}
              slug={`/cinematic/${item.slug}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cinematic;
