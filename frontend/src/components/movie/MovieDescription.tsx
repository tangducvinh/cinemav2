import { IMovie } from "@/app/types/frontend";

import MenuTitle from "../home/MenuTitle";
import { convertArrayToString } from "@/ultis/convert";

interface IProps {
  data: IMovie[] | [];
}

const MovieDescription: React.FC<IProps> = ({ data }) => {
  return (
    <div className="my-10">
      <MenuTitle title={"PHIM ĐANG CHIẾU"} />

      <ul>
        {data
          ?.filter((x, index) => index < 5)
          .map((item: any, number) => (
            <li key={number}>
              <p className="text-[16px] text-[#363636} font-bold mt-6">
                {`${number + 1}. ${item.name} - ${convertArrayToString(
                  item.genres.map((subitem: { name: string }) => subitem.name)
                )} - ${new Date(item.release).getDate()}.${new Date(
                  item.release
                ).getMonth()}`}
              </p>

              <p className="text-normal text-[16px] mt-2">
                Beetlejuice trở lại! Sau một bi kịch gia đình bất ngờ, ba thế hệ
                gia đình Deetz trở về nhà ở Winter River. Vẫn bị Beetlejuice ám
                ảnh, cuộc sống của Lydia bị đảo lộn khi cô con gái tuổi teen nổi
                loạn của cô, Astrid, phát hiện mô hình bí ẩn của thị trấn trong
                gác mái và cổng đến Thế giới bên kia vô tình được mở ra. Khi rắc
                rối đang diễn ra ở cả hai thế giới, chỉ còn là vấn đề thời gian
                trước khi ai đó nói tên Beetlejuice ba lần và con quỷ nghịch
                ngợm trở lại để gây ra sự hỗn loạn của riêng mình.
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieDescription;
