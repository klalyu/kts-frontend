import { Link } from "wouter";

import s from "./Header.module.scss";

type HeaderProps = {
  title: string;
  organization: string;
};
const Header: React.FC<HeaderProps> = ({ organization, title }) => {
  return (
    <div className={s.header}>
      <Link href={`/org/${organization}`}>
        <div></div>
      </Link>
      <span>{title}</span>
    </div>
  );
};

export default Header;
