const InputLogin = () => {
  return (
    <div className="">
      <label className="text-[#777777] text-[12px]">Email</label>
      {/* <input {...register("example")} /> */}
      <input
        className="w-full border-[2px] placeholder:text-[16px] focus:border-blue-400 placeholder:font-semibold p-2 rounded-md outline-none"
        placeholder="Nhập Email"
      ></input>
      <p className="text-[16px] text-[#FF0000] font-medium mt-1">
        Email không được để trống
      </p>
    </div>
  );
};

export default InputLogin;
