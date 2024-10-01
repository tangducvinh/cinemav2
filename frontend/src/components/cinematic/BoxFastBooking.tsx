import SelectOption from "../common/SelectOption";

const BoxFastBooking = () => {
  return (
    <div className="rounded-sm overflow-hidden">
      <header className="bg-forcus text-white text-[18px] font-bold py-4 text-center">
        Mua Vé Nhanh
      </header>
      <div className="bg-[#F8F8F8] p-4 border-gray-300 border flex flex-col gap-6">
        <SelectOption
          title={"Chọn phim"}
          data={[{ id: 1, name: "Kinh Di", value: "kinh di" }]}
          widthFull
        />

        <SelectOption
          title={"Chọn rạp"}
          data={[{ id: 1, name: "Kinh Di", value: "kinh di" }]}
          widthFull
        />

        <SelectOption
          title={"Chọn ngày"}
          data={[{ id: 1, name: "Kinh Di", value: "kinh di" }]}
          widthFull
        />
      </div>
    </div>
  );
};

export default BoxFastBooking;
