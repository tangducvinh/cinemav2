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

const Book = async (props: IProps) => {
  const { params } = props;
  const detailMovie = await apiMovie.getDetailMovie(params.slug);
  const movieShowings = await apiMovie.getMovieByStatus("showing");

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

          <Show movieId={detailMovie.id} />
        </div>
        <div className="flex-3">
          <ShowingMovie data={movieShowings.data} />
        </div>
      </div>
    </>
  );
};

export default Book;
