import React from "react";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input";
import { MultiDropdown } from "@components/MultiDropdown";
import { useNavigate, useParams } from "react-router-dom";

import s from "./Header.module.scss";

const SearchOrganization = () => {
  const { org } = useParams();
  const [search, setsearch] = React.useState<string>(org || "");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/repositories/${search.trim()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${s.pageHeader__row} ${s.pageHeader__search}`}
    >
      <Input
        placeholder="Enter organization name"
        value={search}
        onChange={(value) => setsearch(value)}
      />
      <Button
        className={s.pageHeader__searchBtn}
        disabled={!search.trim()}
        onClick={() => navigate(`/repositories/${search.trim()}`)}
      >
        <img src="/images/search.svg" alt="star-rating" />
      </Button>
    </form>
  );
};

const Header = () => {
  return (
    <div className={s.pageHeader}>
      <SearchOrganization />
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
