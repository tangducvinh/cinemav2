import WatchTrailer from "@/components/book/WatchTrailer";
import InforMovie from "@/components/book/InforMovie";
import ShowingMovie from "@/components/book/ShowingMovie";
import ContentMovie from "@/components/book/ContentMovie";
import { getDetailMovie, getMovieByStatus } from "@/apis/movie";
import Show from "@/components/book/Show";

interface IProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

const Book = async (props: IProps) => {
  const { params } = props;
  const detailMovie = await getDetailMovie(params.slug);

  const movieShowings = await getMovieByStatus("showing");

  return (
    <>
      <WatchTrailer
        backdrop={detailMovie.backdrop}
        keyVideo={detailMovie.video}
      />

      <div className="flex mx-auto w-main gap-6">
        <div className="flex-7">
          <InforMovie data={detailMovie} />

          <ContentMovie overview={detailMovie.overview} />

          <Show />
        </div>
        <div className="flex-3">
          <ShowingMovie data={movieShowings.data} />
        </div>
      </div>
    </>
  );
};

export default Book;
