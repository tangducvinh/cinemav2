"use client";

import clsx from "clsx";
import RingLoader from "react-spinners/RingLoader";

interface IProps {
  fullScreen?: boolean;
}

const Loading: React.FC<IProps> = ({ fullScreen }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center bg-gray-100 z-50 flex-col",
        { "fixed inset-0 h-screen w-screen": fullScreen },
        { "w-full h-full": !fullScreen }
      )}
    >
      <RingLoader
        color={"#036DC2"}
        // loading={loading}
        // cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="mt-2 text-[15px]">Chờ xíu nhé . . . </p>
    </div>
  );
};

export default Loading;
