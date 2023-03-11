import React from "react";
import { useNavigate } from "react-router-dom";

import s from "./Header.module.scss";

type HeaderProps = {
  title: string;
  organization: string;
};
const Header: React.FC<HeaderProps> = ({ organization, title }) => {
  const navigate = useNavigate();

  return (
    <div className={s.header}>
      <div onClick={() => navigate(`/repositories/${organization}`)}></div>
      <span>{title}</span>
    </div>
  );
};

export default Header;
