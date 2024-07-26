import Image from "next/image";

import Slide from "../components/slide/Slide";

export default async function Home() {
  const response = await fetch("http://localhost:7000/api/banner", {
    method: "GET",
  });

  const data = await response.json();

  console.log(data);

  return (
    <div>
      <Slide data={data.data} />
    </div>
  );
}
