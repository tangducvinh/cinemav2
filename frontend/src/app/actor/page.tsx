import MenuTitle from "@/components/home/MenuTitle";

import ContainerMenuActor from "@/components/actor/ContainerMenuActor";
import apiCountry from "@/apis/country";
import apiActor from "@/apis/actor";
import ItemMovieCinematic from "@/components/cinematic/ItemMovieCinematic";

const Actor = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const countryData = apiCountry.getListCountry();
  const actorsData = apiActor.getListActor(searchParams);

  const [countries, actors] = await Promise.all([countryData, actorsData]);

  return (
    <div>
      <MenuTitle title={"Diễn Viên"} />

      <ContainerMenuActor countries={countries?.data} />

      {actors?.length === 0 ? (
        <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
          Không có bài viết nào
        </div>
      ) : (
        <ul className="mt-8">
          {actors?.data?.rows?.map((item: any) => (
            <ItemMovieCinematic
              key={item.id}
              backdrop={item.avatar}
              name={item.name}
              overview={item.description}
              slug={`/actor/${item.slug}`}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Actor;
