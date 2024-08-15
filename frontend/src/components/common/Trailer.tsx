import { memo } from "react";

interface IProps {
  keyVideo: string;
  setShow: () => void;
}

const Trailer = (props: IProps) => {
  const { keyVideo, setShow } = props;

  return (
    <div
      onClick={(e) => {
        setShow();
        e.stopPropagation();
      }}
      className="w-screen h-screen fixed z-50 bg-bg-overlay flex item-center justify-center inset-0"
    >
      <iframe
        className="w-[90%] h-[80%] m-auto"
        src={`https://www.youtube.com/embed/${keyVideo}?si=-q3q2qN3OtGlKOVy`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default memo(Trailer);
