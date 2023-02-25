import React from "react";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input";
import { MultiDropdown } from "@components/MultiDropdown";

import s from "./Header.module.scss";

const Header = () => {
  const [search, setsearch] = React.useState("");

  return (
    <div className={s.pageHeader}>
      <div className={`${s.pageHeader__row} ${s.pageHeader__search}`}>
        <Input
          placeholder="Enter organization name"
          value={search}
          onChange={(value) => setsearch(value)}
        />
        <Button className={s.pageHeader__searchBtn} disabled>
          <img src="/images/search.svg" alt="star-rating" />
        </Button>
      </div>
      <div className={`${s.pageHeader__row}`}>
        <span className={`${s.pageHeader__title}`}>Repositories</span>
        <MultiDropdown
          options={[]}
          value={[]}
          onChange={() => {}}
          pluralizeOptions={(values) =>
            values.length === 0
              ? "Type"
              : values.map((value) => value.value).join(",")
          }
        />
      </div>
    </div>
  );
};

export default Header;
