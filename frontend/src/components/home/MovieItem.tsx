"use client";
import { useCallback, useState } from "react";
import { IoPlayCircleSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import clsx from "clsx";

import Trailer from "../common/Trailer";
import ButtonBuy from "../common/ButtonBuy";

interface IProps {
  name: string;
  poster: string;
  keyVideo: string;
  slug: string;
  size?: string;
  hiddenTrailer?: boolean;
}

const MovieItem = (props: IProps) => {
  const router = useRouter();
  const { name, poster, keyVideo, slug, size, hiddenTrailer } = props;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [watchTrailer, setWatchTrailer] = useState<boolean>(false);

  const handleShowTrailer = useCallback(() => {
    setWatchTrailer((prev) => !prev);
  }, []);

  return (
    <div onClick={() => router.push(`/book/${slug}`)}>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative cursor-pointer rounded-lg overflow-hidden"
      >
        <img src={poster} alt="poster"></img>
        <div className="absolute inset-0 flex items-center justify-center hover:bg-bg-overlay transition-all">
          {isHover && (
            <div>
              <ButtonBuy />
              {!hiddenTrailer && (
                <button
                  onClick={(e) => {
                    setWatchTrailer(true);
                    e.stopPropagation();
                  }}
                  className="flex animate-wiggle items-center gap-2 mt-4 py-2 w-[120px] hover:border-overlay-main hover:bg-overlay-main transition-all justify-center rounded-[3px] border-[1px] border-white"
                >
                  <IoPlayCircleSharp size="20" color="white" />
                  <span className="text-white">Trailer</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <p
        className={clsx("text-overlay mt-4", {
          "font-bold text-[18px]": size !== "sm",
        })}
      >
        {name}
      </p>

      {watchTrailer && (
        <Trailer keyVideo={keyVideo} setShow={handleShowTrailer} />
      )}
    </div>
  );
};

export default MovieItem;
