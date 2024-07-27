import Image from "next/image";

import Slide from "../components/slide/Slide";
import Navbar from "../components/home/Navbar";
import MovieContainer from "../components/home/MovieContainer";

export default async function Home() {
  const response = await fetch("http://localhost:7000/api/banner", {
    method: "GET",
  });
  const slideData = await response.json();

  return (
    <div className="no-scrollbar">
      <Slide data={slideData.data} />

      <div className="w-main m-auto my-[50px]">
        <Navbar />

        {/* <MovieContainer /> */}
      </div>
    </div>
  );
}
