import ItemTime from "../book/ItemTime";

const data = [
  {
    title: "19:00",
    value: "1",
  },
  {
    title: "21:00",
    value: "2",
  },
];

const ChangeShow = () => {
  return (
    <div className="bg-white h-[71px] rounded-sm my-[30px] flex items-center gap-[70px] px-[25px]">
      <h4 className="text-normal font-semibold text-[18px]">Đổi xuất chiếu</h4>

      <div className="flex items-center gap-4">
        {data.map((item) => (
          <ItemTime title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default ChangeShow;
