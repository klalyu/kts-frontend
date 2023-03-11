import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import debounce from "lodash.debounce";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input";
import { MultiDropdown } from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { DEBOUNCE_TIME_MS } from "@config/constants";
import rootStore from "@store/root_store/instance";

import s from "./Header.module.scss";

const SearchOrganization = () => {
  const { org } = useParams();
  const [search, setsearch] = React.useState<string>(org || "");
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (org !== search.trim()) {
      navigate(`/repositories/${search.trim()}`);
    }
  };

  const debouncedEventHandler = React.useMemo(
    () => debounce(handleSubmit, DEBOUNCE_TIME_MS),
    [search]
  );

  React.useEffect(() => {
    debouncedEventHandler();

    return () => {
      debouncedEventHandler.cancel();
    };
  }, [search]);

  return (
    <form
      onSubmit={handleSubmitForm}
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
        onClick={() => handleSubmit()}
      >
        <img src="/images/search.svg" alt="star-rating" />
      </Button>
    </form>
  );
};

// Can be one of: all, public, private, forks, sources, member
const filterTypeRepoItems: Option[] = [
  {
    key: "all",
    value: "All repos",
  },
  {
    key: "public",
    value: "Public repos",
  },
  {
    key: "private",
    value: "Private repos",
  },
  {
    key: "forks",
    value: "Forks",
  },
  {
    key: "sources",
    value: "Sources",
  },
  {
    key: "member",
    value: "Member",
  },
];

const FilterTypeRepo = () => {
  const { org } = useParams();
  const typeRepo = rootStore.query.getParam("type");
  const navigate = useNavigate();

  return (
    <MultiDropdown
      options={filterTypeRepoItems}
      value={filterTypeRepoItems.filter((item) => item.key === typeRepo)}
      onChange={(values) => {
        if (values.length > 1) {
          navigate(
            `/repositories/${org}?${rootStore.query.prepareSearch({
              page: "1",
              type: values.filter((typeValue) => typeValue.key !== typeRepo)[0]
                .key,
            })}`
          );
        } else {
          navigate(
            `/repositories/${org}?${rootStore.query.prepareSearch({
              page: "1",
              type: values.length ? values[0].key : "all",
            })}`
          );
        }
      }}
      pluralizeOptions={(values) =>
        values.length === 0
          ? "Type"
          : values.map((value) => value.value).join(",")
      }
    />
  );
};

const Header = () => {
  return (
    <div className={s.pageHeader}>
      <SearchOrganization />
      <div className={`${s.pageHeader__row}`}>
        <span className={`${s.pageHeader__title}`}>Repositories</span>
        <FilterTypeRepo />
      </div>
    </div>
  );
};

export default Header;
