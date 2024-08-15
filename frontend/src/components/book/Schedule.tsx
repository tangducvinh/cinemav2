import ItemTime from "./ItemTime";

const dataTime = [
  {
    title: "15:00",
    slug: "....",
  },
  {
    title: "17:00",
    slug: "....",
  },
  {
    title: "19:00",
    slug: "....",
  },
];

const Schedule = () => {
  return (
    <div className="mt-8 mb-8">
      <h4 className="text-[18px] text-normal font-bold">Galaxy Lien Chieu</h4>

      <div className="flex items-center mt-4">
        <p className="text-normal text-[16px] w-[150px]">2D Lồng Tiếng</p>

        <div className="flex gap-3 items-center">
          {dataTime.map((item) => (
            <ItemTime title={item.title} key={item.title} slug={item.slug} />
          ))}
        </div>
      </div>

      <div className="flex items-center mt-4">
        <p className="text-normal text-[16px] w-[150px]">2D Lồng Tiếng</p>

        <div className="flex gap-3 items-center">
          {dataTime.map((item) => (
            <ItemTime title={item.title} key={item.title} slug={item.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
