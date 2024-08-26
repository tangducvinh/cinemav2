import moment from "moment";
import { useRouter } from "next/navigation";

import ItemTime from "./ItemTime";
import { IoTerminalSharp } from "react-icons/io5";

interface IProps {
  data: { cinema: { name: string }; timeStart: Date; id: number }[];
}

const Schedule: React.FC<IProps> = ({ data }) => {
  const router = useRouter();

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
              onClick={() => router.push(`/booking/${item.id}`)}
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
