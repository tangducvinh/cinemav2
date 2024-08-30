import Slide from "../components/slide/Slide";
import Navbar from "../components/home/Navbar";
import IntroduceText from "@/components/home/IntroduceText";

export default async function Home() {
  const response = await fetch("http://localhost:7000/api/banner", {
    method: "GET",
    cache: "no-store",
  });
  const slideData = await response.json();

  return (
    <div className="no-scrollbar">
      <Slide data={slideData.data} />

      <div className="w-main m-auto my-[50px]">
        <Navbar />
      </div>

      <div className="w-main mx-auto my-[50px]">
        <IntroduceText />
      </div>
    </div>
  );
}
