"use client";

import { useRouter } from "next/navigation";
import clsx from "clsx";

interface IProps {
  backdrop: string;
  overview?: string;
  name: string;
  slug: string;
  sizeM?: boolean;
}

const ItemMovieCinematic: React.FC<IProps> = ({
  backdrop,
  overview,
  name,
  slug,
  sizeM,
}) => {
  const router = useRouter();
  return (
    <div className="flex items-start gap-3 mt-2">
      <img
        onClick={() => router.push(slug)}
        className={clsx(
          " object-cover rounded-sm cursor-pointer",
          { "w-[150px]": sizeM },
          { "min-w-[255px] h-[170px]": !sizeM }
        )}
        src={backdrop}
        alt={name}
      ></img>

      <div>
        <h3
          onClick={() => router.push(slug)}
          className={clsx(
            "text-[#333333] cursor-pointer",
            { "font-semibold text-[14px]": sizeM },
            { "font-bold text-[18px]": !sizeM }
          )}
        >
          {name}
        </h3>

        <p className="text-[14px] text-normal line-clamp-3 mt-2">{overview}</p>
      </div>
    </div>
  );
};

export default ItemMovieCinematic;
