import MenuTitle from "../home/MenuTitle";
import NavBarDate from "./NavBarDate";
import Schedule from "./Schedule";

const Show = () => {
  return (
    <div className="mt-8">
      <MenuTitle title="Lịch Chiếu" size="small" />

      <NavBarDate />

      <Schedule />
    </div>
  );
};

export default Show;
