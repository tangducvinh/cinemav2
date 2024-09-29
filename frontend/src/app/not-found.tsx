import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";

import notfound from "../assets/not-found.png";

export const metadata: Metadata = {
  title: "Cinema: Hệ thống rạp chiếu phim",
  description:
    "Hiện nay, Galaxy Cinema đang ngày càng phát triển hơn nữa với các chương trình đặc sắc, các khuyến mãi hấp dẫn, đem đến cho khán giả những bộ phim bom tấn của thế giới và Việt Nam nhanh chóng và sớm nhất.",
};

export default function NotFound() {
  return <Image className="my-10 mx-auto" src={notfound} alt="404"></Image>;
}
