import { IoTicketOutline } from "react-icons/io5";


const ButtonBuy = () => {
  return (
    <button className="flex animate-wiggle items-center gap-2 py-2 w-[120px] border-[1px] border-transparent justify-center transition-all rounded-[3px] bg-[#F05A27] hover:bg-main">
      <IoTicketOutline size="20" color="white" />
      <span className="text-white">Mua vé</span>
    </button>
  );
};

export default ButtonBuy;
