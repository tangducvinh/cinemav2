import MenuTitle from "@/components/home/MenuTitle";

import ContainerMenuActor from "@/components/actor/ContainerMenuActor";
import apiCountry from "@/apis/country";
import apiDirector from "@/apis/director";
import ItemMovieCinematic from "@/components/cinematic/ItemMovieCinematic";
import Pagination from "@/components/common/Pagination";

const Director = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const countryData = apiCountry.getListCountry();
  const directorsData = apiDirector.getListDirector(searchParams);

  const [countries, directors] = await Promise.all([
    countryData,
    directorsData,
  ]);

  return (
    <div>
      <MenuTitle title={"ĐẠO DIỄN"} />

      <ContainerMenuActor countries={countries?.data} />

      {directors?.data?.count === 0 ? (
        <div className="text-normal flex items-center justify-center w-full min-h-[300px]">
          Không có bài viết nào
        </div>
      ) : (
        <>
          <ul className="mt-8">
            {directors?.data?.rows.map((item: any) => (
              <ItemMovieCinematic
                key={item.id}
                backdrop={
                  item.avatar ||
                  "https://www.galaxycine.vn/_next/static/media/not_found.f844bf41.jpg"
                }
                name={item.name}
                overview={item.description}
                slug={`/director/${item.slug}`}
              />
            ))}
          </ul>

          {directors?.data?.count > 10 && (
            <Pagination total={directors?.data?.count} />
          )}
        </>
      )}
    </div>
  );
};

export default Director;
