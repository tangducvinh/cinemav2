import moment from "moment";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";

import ItemTime from "./ItemTime";
import Notice from "../common/Notice";

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
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleOnClick = (item: IItemShow) => {
    let token = localStorage.getItem("token");
    if (token) token =JSON.parse(token)
    if (token) {
      router.push(`/booking/${item.movie.slug}`);
      localStorage.setItem("currentShow", JSON.stringify(item.id));
    } else {
      setShowWarning(true);
    }
  };

  const handleCloseWarning = useCallback(() => {
    setShowWarning(false);
  }, [showWarning]);

  return (
    <div className="mt-8 mb-8">
      {showWarning && (
        <Notice
          text={"Vui lòng thực hiện đăng nhập để có thể đặt vé"}
          onClose={handleCloseWarning}
        />
      )}
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
