import React from "react";

import FilterTypeRepo from "./components/filter";
import Search from "./components/search";

import s from "./Header.module.scss";

const Header = () => {
  return (
    <div className={s.pageHeader}>
      <Search className={`${s.pageHeader__row}`} />
      <div className={`${s.pageHeader__row}`}>
        <span className={`${s.pageHeader__title}`}>Repositories</span>
        <FilterTypeRepo />
      </div>
    </div>
  );
};

export default Header;
