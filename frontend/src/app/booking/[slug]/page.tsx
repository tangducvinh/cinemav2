import type { Metadata, ResolvingMetadata } from "next";

import HeaderBooking from "@/components/booking/HeaderBooking";
import ContentShow from "@/components/booking/ContentShow";
import apiFood from "@/apis/food";
import apiMovie from "@/apis/movie";

interface IProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams() {
  const movies = await apiMovie.getListMovie();

  return movies?.data?.rows?.map((movie: { slug: string }) => ({
    slug: movie.slug,
  }));
}

export async function generateMetadata(
  { params, searchParams }: IProps,
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

const BookingShow = async () => {
  const comboFoods = await apiFood.getListFood();

  return <ContentShow dataFood={comboFoods?.data} />;
};

export default BookingShow;
