import { FaChevronRight } from "react-icons/fa";
import Link from "next/link";

const ButtonWatchMore = () => {
  return (
    <Link
      href={"/movie/showing"}
      className="text-[14px] text-main flex items-center border px-8 justify-center border-main py-2 gap-2 rounded-sm hover:text-white hover:bg-main transition-all"
    >
      Xem thêm <FaChevronRight />
    </Link>
  );
};

export default ButtonWatchMore;
