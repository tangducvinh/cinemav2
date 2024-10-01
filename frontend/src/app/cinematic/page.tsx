import ContentCinematic from "@/components/cinematic/ContentCinematic";
import apiGenre from "@/apis/genre";
import apiMovie from "@/apis/movie";

const Cinematic = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const genresData = apiGenre.getListGenres();
  const moviesData = apiMovie.getListMovie2(searchParams);
  const moviesShowingData = apiMovie.getListMovie2({ status: "showing" });

  const [genres, movies, moviesShowing] = await Promise.all([
    genresData,
    moviesData,
    moviesShowingData,
  ]);

  return (
    <div className="w-main mx-auto mt-10">
      <ContentCinematic
        genres={genres.data}
        movies={movies}
        moviesShowing={moviesShowing}
      />
    </div>
  );
};

export default Cinematic;
