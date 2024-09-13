const listMethodPayment = [
  {
    title: "VNPAY",
    icon: "https://cdn.galaxycine.vn/media/2021/12/2/download_1638460623615.png",
    value: "vnpay",
  },
  {
    title: "Zalopay",
    icon: "https://cdn.galaxycine.vn/media/2024/7/10/zalopay_1720600308412.png",
    value: "zalopay",
  },
];

interface IProps {
  methodPayment: string | undefined;
  onSetMethodPayment: (x: string) => void;
}

const Payment: React.FC<IProps> = ({ methodPayment, onSetMethodPayment }) => {
  return (
    <div className="mt-8 bg-white p-4">
      <h3 className="text-[20px] text-normal font-semibold">
        Phương thức thanh toán
      </h3>

      <form>
        {listMethodPayment.map((item) => (
          <label key={item.title} className="flex items-center gap-2">
            <input
              onChange={(e) => onSetMethodPayment(e.target.value)}
              className="w-[17px] h-[17px]"
              name="h"
              type="radio"
              value={item.value}
            ></input>
            <img className="w-[70px] h-[70px]" alt="icon" src={item.icon}></img>
            <p className="text-normal text-[18px]">{item.title}</p>
          </label>
        ))}
      </form>

      <p className="text-normal text-[16px] mt-8">
        (*) Bằng việc click/chạm vào THANH TOÁN bên phải, bạn đã xác nhận hiểu
        rõ các Quy Định Giao Dịch Trực Tuyến của Galaxy Cinema.
      </p>
    </div>
  );
};

export default Payment;
