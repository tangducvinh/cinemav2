import InforDetailMovie from "@/components/detail-moive/InforDetailMovie";
import ContentMovie from "@/components/book/ContentMovie";
import apiMovie from "@/apis/movie";

interface IProps {
  params: { slug: string };
}

const DetailMovie: React.FC<IProps> = async ({ params }) => {
  const movie = await apiMovie.getDetailMovie(params.slug);

  console.log(movie);

  return (
    <div>
      <InforDetailMovie movie={movie} />

      <ContentMovie overview={movie.overview} />
    </div>
  );
};

export default DetailMovie;
