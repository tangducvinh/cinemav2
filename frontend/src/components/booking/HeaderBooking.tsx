"use client";
import clsx from "clsx";

const data = [
  "Chọn phim / Rạp / Suất",
  "Chọn ghế",
  "Chọn thức ăn",
  "Thanh toán",
  "Xác nhận",
];

interface IProps {
  currentIndex: number;
}

const HeaderBooking: React.FC<IProps> = ({ currentIndex }) => {
  return (
    <div className="h-[74px] mt-2 w-full bg-white flex justify-center">
      <ul className="mx-auto flex items-center">
        {data?.map((item, index) => (
          <p
            key={index}
            className={clsx(
              "text-[18px] font-semibold px-4 border-b-[3px] py-2",
              {
                "text-forcus opacity-100 border-b-forcus":
                  index <= currentIndex,
              },
              { "opacity-30": index > currentIndex }
            )}
          >
            {item}
          </p>
        ))}
      </ul>
    </div>
  );
};

export default HeaderBooking;
