"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter, useParams } from "next/navigation";

import ItemTime from "../book/ItemTime";
import apiShow from "@/apis/show";

interface IProps {
  cinemaId: number;
  movieId: number;
  timeStart: Date;
}

interface IShow {
  timeStart: Date;
  id: number;
}

const ChangeShow: React.FC<IProps> = ({ cinemaId, movieId, timeStart }) => {
  const [dataListShow, setDataListShow] = useState<IShow[]>([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchListShow = async () => {
      const response = await apiShow.getListShow({
        cinemaId,
        movieId,
        date: moment(timeStart).format("yyyy/MM/DD").toString(),
        cityId: 0,
      });

      setDataListShow(response);
    };

    fetchListShow();
  }, [cinemaId, movieId, timeStart]);

  return (
    <div className="bg-white h-[71px] rounded-sm my-[30px] flex items-center gap-[70px] px-[25px]">
      <h4 className="text-normal font-semibold text-[18px]">Đổi xuất chiếu</h4>

      <div className="flex items-center gap-4">
        {dataListShow.map((item) => (
          <ItemTime
            onClick={() => router.push(`/booking/${item.id}`)}
            title={moment(item.timeStart).format("HH:mm")}
            checked={item.id.toString() === params.slug ? true : false}
          />
        ))}
      </div>
    </div>
  );
};

export default ChangeShow;
