import MenuTitle from "@/components/home/MenuTitle";
import ContentCinematic from "@/components/cinematic/ContentCinematic";
import apiGenre from "@/apis/genre";

const Cinematic = async () => {
  const genresData = apiGenre.getListGenres();

  const [genres] = await Promise.all([genresData]);

  return (
    <div className="w-main mx-auto mt-10">
      <ContentCinematic genres={genres.data} />
    </div>
  );
};

export default Cinematic;
