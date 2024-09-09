import { CiCamera } from "react-icons/ci";

const listInformation = [
  {
    title: "HOTLINE hỗ trợ: ",
    value: "19002224 (9:00 22:00)",
  },
  {
    title: "Email: ",
    value: "hotro@galaxystudio.vn",
  },
  {
    title: "Câu hỏi thường gặp",
    value: "",
  },
];

const Profile = () => {
  return (
    <div className="w-[384px] bg-white shadow-md rounded-sm px-6 pb-4">
      <div className="flex items-center justify-center gap-4 border-b-2 py-7 mx-4 border-b-gray-300 ">
        <div className="w-[72px] h-[72px] rounded-full bg-gray-200 flex items-center justify-center">
          <CiCamera size={35} />
        </div>

        <div>
          <p className="text-normal font-bold">Tăng Đức Vinh</p>
          <p>0 Stars</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between py-6">
          <p className="text-normal font-bold text-[20px]">
            Tổng chi tiêu 2024
          </p>

          <span className="text-main text-[20px] font-bold">0đ</span>
        </div>

        <div className="py-[100px]">
          <div className="w-full h-[10px] relative border-blue-400 border-2 rounded-full">
            <div className={"absolute left-[0px] top-[50%] translate-y-[-50%]"}>
              <div className="w-[15px] h-[15px] border-blue-500 border-[3px] bg-white rounded-full">
                <img
                  className="absolute top-[-35px]"
                  alt="badge"
                  src="https://www.galaxycine.vn/_next/static/media/bronze.6c2b2f39.png"
                ></img>

                <span className="text-normal text-[18px] left-[50%] translate-x-[-50%] absolute top-[30px]">
                  0đ
                </span>
              </div>
            </div>

            <div
              className={"absolute left-[140px] top-[50%] translate-y-[-50%]"}
            >
              <div className="w-[15px] h-[15px] border-blue-500 border-[3px] bg-white rounded-full">
                <img
                  className="absolute object-cover top-[-35px]"
                  alt="badge"
                  src="https://www.galaxycine.vn/_next/static/media/silver.6313aa20.png"
                ></img>

                <span className="text-normal left-[50%] translate-x-[-50%] text-[18px] absolute top-[30px]">
                  2.000.000đ
                </span>
              </div>
            </div>

            <div
              className={"absolute left-[280px] top-[50%] translate-y-[-50%]"}
            >
              <div className="w-[15px] h-[15px] border-blue-500 border-[3px] bg-white rounded-full">
                <img
                  className="absolute top-[-35px]"
                  alt="badge"
                  src="	https://www.galaxycine.vn/_next/static/media/gold.ff661579.png"
                ></img>

                <span className="text-normal text-[18px] left-[50%] translate-x-[-50%] absolute top-[30px]">
                  4.000.000đ
                </span>
              </div>
            </div>
          </div>
        </div>

        <div>
          {listInformation.map((item) => (
            <div
              key={item.title}
              className="flex items-center text-[16px] font-semibold py-3 border-gray-200 border-t-2"
            >
              <p>{item.title}</p>
              <span className="text-blue-400">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
