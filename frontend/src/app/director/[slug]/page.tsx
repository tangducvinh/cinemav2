import InforActor from "@/components/actor/InforActor";
import apiDirector from "@/apis/director";
import MenuTitle from "@/components/home/MenuTitle";
import ItemMovieCinematic from "@/components/cinematic/ItemMovieCinematic";

interface IProps {
  params: { slug: string };
}

const DetailActor: React.FC<IProps> = async ({ params }) => {
  const director = await apiDirector.getDetailDirector({ slug: params.slug });

  console.log({ director });

  return (
    <div>
      <InforActor actor={director} />

      <div className="mt-10">
        <MenuTitle title={"PHIM ĐÃ THAM GIA"} />

        <ul className="grid grid-cols-2 mt-4">
          {director?.movies.map((item: any) => (
            <ItemMovieCinematic
              key={item.id}
              backdrop={item.backdrop}
              name={item.name}
              slug={`/cinematic/${item.slug}`}
              sizeM
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DetailActor;
