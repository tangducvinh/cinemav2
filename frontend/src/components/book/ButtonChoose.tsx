import Link from "next/link";

interface IProps {
  title: string;
  link: string;
}

const ButtonChoose: React.FC<IProps> = ({ title, link }) => {
  return (
    <Link
      href={link}
      className="px-3 py-1 hover:border-main border-2 transition-all rounded-lg border-gray-300"
    >
      {title}
    </Link>
  );
};

export default ButtonChoose;
