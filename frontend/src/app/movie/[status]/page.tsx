import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import clsx from "clsx";

import MenuTitle from "@/components/home/MenuTitle";
import apiMovie from "@/apis/movie";
import MovieContainer from "@/components/home/MovieContainer";
import MovieDescription from "@/components/movie/MovieDescription";

const titleList = [
  {
    title: "Đang chiếu",
    value: "showing",
    link: "/movie/showing",
    metaData: "Đang Chiếu",
  },
  {
    title: "Sắp chiếu",
    value: "soon",
    link: "/movie/soon",
    metaData: "Sắp ChiếU",
  },
  {
    title: "Phim IMAX",
    value: "imax",
    link: "/movie/imax",
    metaData: "IMAX",
  },
];

export function generateStaticParams() {
  return titleList.map((item) => ({
    status: item.value,
  }));
}

interface IProps {
  params: { status: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const status = params.status;

  return {
    title: `Xem Phim ${
      titleList.find((item) => item.value === status)?.title
    } Phim Hay Tai Cinema`,
    description: `Xem Phim ${
      titleList.find((item) => item.value === status)?.title
    } Phim Hay Tai Cinema`,
  };
}

const Movie = async ({ params }: { params: { status: string } }) => {
  const movies = await apiMovie.getListMovie({ status: params.status });

  return (
    <div className="w-main mx-auto mt-10">
      <div className="flex items-center mb-10">
        <MenuTitle title={"PHIM"} />

        <ul className="flex items-center gap-8">
          {titleList.map((item) => (
            <Link
              href={item.link}
              key={item.value}
              className={clsx(
                "font-bold relative text-[18px] hover:text-forcus cursor-pointer transition-all",
                {
                  "opacity-100 text-forcus": params?.status === item.value,
                  "text-overlay opacity-60": params?.status !== item.value,
                }
              )}
            >
              {item.title}
              {params?.status === item.value && (
                <div className="w-[30px] absolute bg-forcus transition-all h-[2px] left-[50%] translate-x-[-50%]"></div>
              )}
            </Link>
          ))}
        </ul>
      </div>

      <MovieContainer data={movies?.rows || []} />

      <MovieDescription data={movies?.rows || []} />
    </div>
  );
};

export default Movie;
