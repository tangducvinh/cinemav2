import { IoSearchSharp } from "react-icons/io5";

const Profile = () => {
  return (
    <div className="flex gap-6">
      <button>
        <IoSearchSharp size="22" color="gray" />
      </button>

      <button className="text-[#777777] hover:text-main transition-all cursor-pointer">
        Đăng nhập
      </button>
    </div>
  );
};

export default Profile;
