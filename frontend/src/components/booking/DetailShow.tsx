const DetailShow = () => {
  return (
    <div className="mt-10 bg-white rounded-md border-t-[8px] p-4 border-t-main">
      <div className="flex gap-2">
        <div className="flex-1">
          <img
            src="https://cdn.galaxycine.vn/media/2024/8/12/harold-500_1723454759393.jpg"
            alt="poster"
          ></img>
        </div>

        <div className="flex-2">
          <h3 className="text-normal font-semibold text-[18px]">
            Harold Và Cây Bút Phép Thuật
          </h3>

          <p className="text-[16px] mt-2">2D</p>
        </div>
      </div>

      <h2 className="text-[18px] mt-8 font-bold text-normal">
        Galaxy Nguyễn Du - <span className="font-medium">RAP 4</span>
      </h2>

      <p className="text-[18px] mt-2 text-normal">
        Suất: <span className="font-semibold">16:45</span> - Thứ Sáu,{" "}
        <span className="font-semibold">23/08/2024</span>
      </p>

      <div className="flex items-center text-normal py-5 justify-between text-[18px] mt-4 border-t-gray-400 border-dashed border-t-2">
        <p className="font-bold">Tổng cộng</p>
        <p className="font-bold text-main">0 đ</p>
      </div>
    </div>
  );
};

export default DetailShow;
