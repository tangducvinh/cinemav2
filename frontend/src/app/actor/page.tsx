import MenuTitle from "@/components/home/MenuTitle";

import ContainerMenuActor from "@/components/actor/ContainerMenuActor";
import apiCountry from "@/apis/country";
import apiActor from "@/apis/actor";
import ItemMovieCinematic from "@/components/cinematic/ItemMovieCinematic";
import Pagination from "@/components/common/Pagination";

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

      {actors?.data?.rows?.length === 0 ? (
        <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
          Không có bài viết nào
        </div>
      ) : (
        <>
          <ul className="mt-8">
            {actors?.data?.rows?.map((item: any) => (
              <ItemMovieCinematic
                key={item.id}
                backdrop={
                  item.avatar ||
                  "https://www.galaxycine.vn/_next/static/media/not_found.f844bf41.jpg"
                }
                name={item.name}
                overview={item.description}
                slug={`/actor/${item.slug}`}
              />
            ))}
          </ul>

          {actors?.data?.count > 10 && (
            <Pagination total={actors?.data?.count} />
          )}
        </>
      )}
    </div>
  );
};

export default Actor;
