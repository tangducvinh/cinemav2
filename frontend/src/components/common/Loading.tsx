"use client";

import clsx from "clsx";

interface IProps {
  fullScreen?: boolean;
}

const Loading: React.FC<IProps> = ({ fullScreen }) => {
  return (
    <div
      className={clsx(
        "flex items-center justify-center bg-gray-100 z-50",
        { "fixed inset-0 h-screen w-screen": fullScreen },
        { "w-full h-full": !fullScreen }
      )}
    >
      ...loading
    </div>
  );
};

export default Loading;
