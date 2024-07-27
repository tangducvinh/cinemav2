"use client";
import { useCallback, useState } from "react";
import { IoTicketOutline } from "react-icons/io5";
import { IoPlayCircleSharp } from "react-icons/io5";
import Trailer from "../common/Trailer";

interface IProps {
  name: string;
  poster: string;
  keyVideo: string;
}

const MovieItem = (props: IProps) => {
  const { name, poster, keyVideo } = props;

  console.log(keyVideo);

  const [isHover, setIsHover] = useState<boolean>(false);
  const [watchTrailer, setWatchTrailer] = useState<boolean>(false);

  const handleShowTrailer = useCallback(() => {
    setWatchTrailer((prev) => !prev);
  }, []);

  return (
    <div>
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative cursor-pointer rounded-lg overflow-hidden"
      >
        <img src={poster} alt="poster"></img>
        <div className="absolute inset-0 flex items-center justify-center hover:bg-bg-overlay transition-all">
          {isHover && (
            <div>
              <button className="flex animate-wiggle items-center gap-2 py-2 w-[120px] border-[1px] border-transparent justify-center transition-all rounded-[3px] bg-[#F05A27] hover:bg-main">
                <IoTicketOutline size="20" color="white" />
                <span className="text-white">Mua vé</span>
              </button>
              <button
                onClick={() => setWatchTrailer(true)}
                className="flex animate-wiggle items-center gap-2 mt-4 py-2 w-[120px] hover:border-overlay-main hover:bg-overlay-main transition-all justify-center rounded-[3px] border-[1px] border-white"
              >
                <IoPlayCircleSharp size="20" color="white" />
                <span className="text-white">Trailer</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="text-overlay mt-4 text-[18px] font-bold">{name}</p>

      {watchTrailer && (
        <Trailer keyVideo={keyVideo} setShow={handleShowTrailer} />
      )}
    </div>
  );
};

export default MovieItem;
