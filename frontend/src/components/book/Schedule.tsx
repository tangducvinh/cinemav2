import moment from "moment";
import { useRouter } from "next/navigation";

import ItemTime from "./ItemTime";

interface IItemShow {
  cinema: { name: string };
  timeStart: Date;
  id: number;
  movie: { slug: string };
}

interface IProps {
  data: IItemShow[];
}

const Schedule: React.FC<IProps> = ({ data }) => {
  const router = useRouter();

  const handleOnClick = (item: IItemShow) => {
    router.push(`/booking/${item.movie.slug}`);
    localStorage.setItem('currentShow', JSON.stringify(item.id))
  };

  return (
    <div className="mt-8 mb-8">
      <h4 className="text-[18px] text-normal font-bold">
        {data[0].cinema.name}
      </h4>

      <div className="flex items-center mt-4">
        <p className="text-normal text-[16px] w-[150px]">2D</p>

        <div className="flex gap-3 items-center">
          {data.map((item) => (
            <ItemTime
              onClick={() => handleOnClick(item)}
              title={moment(item.timeStart).format("HH:mm")}
              key={item.id}
              slug={""}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;
