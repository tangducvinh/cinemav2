import Slide from "../components/slide/Slide";
import Navbar from "../components/home/Navbar";
import IntroduceText from "@/components/home/IntroduceText";
import { apisBanner } from "@/apis/banner";
import apiMovie from "@/apis/movie";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cinema: Hệ thống rạp chiếu phim",
  description:
    "Hiện nay, Galaxy Cinema đang ngày càng phát triển hơn nữa với các chương trình đặc sắc, các khuyến mãi hấp dẫn, đem đến cho khán giả những bộ phim bom tấn của thế giới và Việt Nam nhanh chóng và sớm nhất.",
};

export default async function Home() {
  const bannerData = await apisBanner.getListBanner();
  const moviesData = await apiMovie.getListMovie();

  const [banners, movies] = await Promise.all([bannerData, moviesData]);

  return (
    <div className="no-scrollbar">
      <Slide data={banners.data} />

      <div className="w-main m-auto my-[50px]">
        <Navbar movies={movies} />
      </div>

      <div className="w-main mx-auto my-[50px]">
        <IntroduceText />
      </div>
    </div>
  );
}
