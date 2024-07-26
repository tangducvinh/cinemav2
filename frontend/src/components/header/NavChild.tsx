interface Iprops {
  data: { name: string }[];
}

interface IItem {
  name: string;
}

const NavChild = (props: Iprops) => {
  const { data } = props;
  console.log(data);
  return (
    <ul className="absolute pt-4 rounded-sm bg-white shadow-lg w-[200px] z-40 left-[-50px]">
      {data &&
        data.map((item, index) => (
          <li className="py-2 text-normal text-center hover:bg-[#FFF1E6] hover:text-main hover:border-l-4 border-main">
            {item.name}
          </li>
        ))}
    </ul>
  );
};

export default NavChild;
