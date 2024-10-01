const ItemMovieCinematic = () => {
  return (
    <div className="flex items-start gap-3 mt-2">
      <img
        className="w-[255px] h-[170px] object-contain rounded-sm"
        src="https://www.galaxycine.vn/media/2019/4/10/640wx396h_1554864314405.jpg"
        alt="backdrop"
      ></img>

      <div>
        <h3 className="text-[#333333] font-bold text-[18px]">
          Avengers: Endgame
        </h3>

        <p className="text-[14px] text-normal line-clamp-3 mt-2">
          Cú búng tay của Thanos đã khiến toàn bộ dân số biến mất một nửa. Các
          siêu anh hùng đánh mất bạn bè, người thân và đánh mất cả chính mình.
          Bộ sáu Avengers đầu tiên tứ tán. Iron Man kẹt lại ngoài không gian,
          Hawkeye mất tích. Thor, Captain America, Hulk và Black
        </p>
      </div>
    </div>
  );
};

export default ItemMovieCinematic;
