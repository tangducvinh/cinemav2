import MenuTitle from "@/components/home/MenuTitle";

const Cinematic = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // const moviesData = apiMovie.getListMovie(searchParams);
  // const genresData = apiGenre.getListGenres();

  // const [genres, movies] = await Promise.all([genresData, moviesData]);

  return (
    <div>
      <MenuTitle title={"BÌNH LUẬN PHIM"} />

      {/* <ContainerMenu genres={genres.data} /> */}

      <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
        Không có bài viết nào
      </div>

      {/* {movies?.length === 0 ? (
        <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
          Không có bài viết nào
        </div>
      ) : (
        <ul className="mt-8">
          {movies?.rows.map((item: any) => (
            <ItemMovieCinematic
              key={item.id}
              backdrop={item.backdrop}
              name={item.name}
              overview={item.overview}
              slug={`/cinematic/${item.slug}`}
            />
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default Cinematic;
