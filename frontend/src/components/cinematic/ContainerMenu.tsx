import SelectOption from "../common/SelectOption";

const ContainerMenu = () => {
  return (
    <div className="mt-4">
      {
        <SelectOption
          title={"Thể loại"}
          data={[{ id: 1, name: "Kinh Di", value: "kinh di" }]}
          //   onChange={() => {}}
        />
      }
    </div>
  );
};

export default ContainerMenu;
