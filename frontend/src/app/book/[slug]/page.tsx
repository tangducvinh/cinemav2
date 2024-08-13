import WatchTrailer from "@/components/book/WatchTrailer";
import InforMovie from "@/components/book/InforMovie";
import ShowingMovie from "@/components/book/ShowingMovie";
import ContentMovie from "@/components/book/ContentMovie";

const Book = () => {
  return (
    <>
      <WatchTrailer />

      <div className="flex mx-auto w-main">
        <div className="flex-7">
          <InforMovie />

          <ContentMovie />
        </div>
        <div className="flex-3">
          <ShowingMovie />
        </div>
      </div>
    </>
  );
};

export default Book;
