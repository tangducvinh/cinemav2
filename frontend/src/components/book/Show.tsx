import MenuTitle from "../home/MenuTitle";
import NavBarDate from "./NavBarDate";

import apiCity from "@/apis/city";

interface IProps {
  movieId: number;
}

const Show: React.FC<IProps> = async ({ movieId }) => {
  const listCities = await apiCity.getListCity();

  return (
    <div className="mt-8">
      <MenuTitle title="Lịch Chiếu" size="small" />

      <NavBarDate movieId={movieId} listCities={listCities || []} />
    </div>
  );
};

export default Show;
