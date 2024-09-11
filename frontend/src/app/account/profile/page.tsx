import { IoPersonSharp } from "react-icons/io5";
import { IoCalendarClearSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { FaLock } from "react-icons/fa6";
import { cookies } from "next/headers";

import InputProfile from "@/components/account/InputProfile";
import apiUser from "@/apis/user";

const data = [
  {
    label: "Họ và tên",
    icon: <IoPersonSharp />,
    value: "",
    type: "text",
  },
  {
    label: "Ngày sinh",
    icon: <IoCalendarClearSharp />,
    value: "",
    type: "text",
    isDate: true,
  },
  {
    label: "Email",
    icon: <MdEmail />,
    value: "",
    type: "text",
  },
  {
    label: "Số điện thoại",
    icon: <MdOutlinePhoneIphone />,
    value: "",
    type: "text",
  },
  {
    subData: [
      {
        title: "Nam",
      },
      {
        title: "Nữ",
      },
    ],
    type: "radio",
    value: "",
  },
  {
    label: "Mật khẩu",
    icon: <FaLock />,
    value: "123456789",
    type: "password",
    change: true,
  },
];

const Profile = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  const dataRes = await apiUser.getProfile(token?.value);

  if (dataRes.success) {
    data[0].value = dataRes.data.fullName;
    data[1].value = dataRes.data.birthday;
    data[2].value = dataRes.data.email;
    data[3].value = dataRes.data.phone;
    data[4].value = dataRes.data.sex;
  }

  return (
    <div className="w-full bg-white rounded-sm shadow-xl mt-4 p-8 grid grid-cols-2 gap-5">
      {data.map((item) =>
        item.type === "text" || item.type === "password" ? (
          <InputProfile
            key={item.label}
            label={item.label}
            value={item.value}
            Icon={item.icon}
            type={item.type}
            isDate={item?.isDate || undefined}
            change={item.change}
          />
        ) : (
          <div className="flex items-center gap-6">
            <div className="flex items-center opacity-80">
              <input
                className="w-[18px] h-[18px] text-gray-300"
                type="radio"
                name="gender"
                disabled={true}
                checked={Boolean(dataRes.data.sex)}
              ></input>
              <label className="text-normal ml-2 text-[16px]">Nam</label>
            </div>

            <div className="flex items-center opacity-80">
              <input
                className="w-[18px] h-[18px] text-gray-300"
                type="radio"
                name="gender"
                disabled={true}
                checked={!Boolean(dataRes.data.sex)}
              ></input>
              <label className="text-normal ml-2 text-[16px]">Nữ</label>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
