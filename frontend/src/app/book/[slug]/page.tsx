import WatchTrailer from "@/components/book/WatchTrailer";
import InforMovie from "@/components/book/InforMovie";
import ShowingMovie from "@/components/book/ShowingMovie";
import ContentMovie from "@/components/book/ContentMovie";
import apiMovie from "@/apis/movie";
import Show from "@/components/book/Show";

interface IProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  const movies = await apiMovie.getListMovie();

  return movies.map((movie: { slug: string }) => ({
    slug: movie.slug,
  }));
}

const Book = async (props: IProps) => {
  const { params } = props;
  const movieData = await apiMovie.getDetailMovie(params.slug);
  const moviesShowingData = await apiMovie.getListMovie("showing");

  const [movie, moviesShowing] = await Promise.all([
    movieData,
    moviesShowingData,
  ]);

  return (
    <>
      <WatchTrailer backdrop={movie.backdrop} keyVideo={movie.video} />

      <div className="flex mx-auto w-main gap-6">
        <div className="flex-7">
          <InforMovie data={movie} />

          <ContentMovie overview={movie.overview} />

          <Show movieId={movie.id} />
        </div>
        <div className="flex-3">
          <ShowingMovie data={moviesShowing} />
        </div>
      </div>
    </>
  );
};

export default Book;
