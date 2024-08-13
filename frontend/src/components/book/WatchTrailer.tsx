import { BsFillPlayCircleFill } from "react-icons/bs";

const WatchTrailer = () => {
  return (
    <div className="bg-black relative h-[500px]">
      <img
        className="m-auto w-[40%] opacity-70 h-full"
        src="https://cdn.galaxycine.vn/media/2024/8/1/handsome-guys-750_1722487017375.jpg"
        alt="backdrop"
      ></img>

      <BsFillPlayCircleFill
        className="absolute hover:cursor-pointer top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"
        color="white"
        size="60"
      />
    </div>
  );
};

export default WatchTrailer;
