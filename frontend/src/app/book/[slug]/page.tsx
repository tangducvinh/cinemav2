import type { Metadata, ResolvingMetadata } from "next";

import WatchTrailer from "@/components/book/WatchTrailer";
import InforMovie from "@/components/book/InforMovie";
import ShowingMovie from "@/components/book/ShowingMovie";
import ContentMovie from "@/components/book/ContentMovie";
import apiMovie from "@/apis/movie";
import Show from "@/components/book/Show";
import ButtonWatchMore from "@/components/common/ButtonWatchMore";
import NotFound from "@/app/not-found";

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

export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const movie = await apiMovie.getDetailMovie(slug);

  return {
    title: `Đặt vé phim ${movie?.name}`,
    description: movie?.overview,
  };
}

const Book = async (props: IProps) => {
  const { params } = props;
  const movieData = await apiMovie.getDetailMovie(params.slug);
  const moviesShowingData = await apiMovie.getListMovie("showing");

  const [movie, moviesShowing] = await Promise.all([
    movieData,
    moviesShowingData,
  ]);

  if (!movie) return <NotFound />;

  return (
    <>
      <WatchTrailer backdrop={movie.backdrop} keyVideo={movie.video} />

      <div className="flex mx-auto w-main gap-6 mb-10">
        <div className="flex-7">
          <InforMovie data={movie} />

          <ContentMovie overview={movie.overview} />

          <Show movieId={movie.id} />
        </div>
        <div className="flex-3">
          <ShowingMovie data={moviesShowing} />

          <div className="flex justify-end mt-4">
            <ButtonWatchMore />
          </div>
        </div>
      </div>
    </>
  );
};

export default Book;
