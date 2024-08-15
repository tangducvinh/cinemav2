"use client";

import { useState, useCallback } from "react";

import { BsFillPlayCircleFill } from "react-icons/bs";
import Trailer from "../common/Trailer";

interface IProps {
  backdrop: string;
  keyVideo: string;
}

const WatchTrailer: React.FC<IProps> = ({ backdrop, keyVideo }) => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);

  const handleShowTrailer = useCallback(() => {
    setShowTrailer((prev) => !prev);
  }, []);

  return (
    <div className="bg-black relative h-[500px]">
      <img
        className="m-auto w-[40%] opacity-70 h-full"
        src={backdrop}
        alt="backdrop"
      ></img>

      <BsFillPlayCircleFill
        className="absolute hover:cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        onClick={handleShowTrailer}
        color="white"
        size="60"
      />

      {showTrailer && (
        <Trailer setShow={handleShowTrailer} keyVideo={keyVideo} />
      )}
    </div>
  );
};

export default WatchTrailer;
