import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import classNames from "classnames";

import { Button } from "@components/Button/Button";
import { Input } from "@components/Input";
import { DEBOUNCE_TIME_MS } from "@config/constants";

import s from "./Search.module.scss";

type SearchProps = {
  className: string;
};

const Search: React.FC<SearchProps> = ({ className }) => {
  const { org } = useParams();
  const [search, setsearch] = React.useState<string>(org || "");
  const navigate = useNavigate();

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (org !== search.trim() && search.trim().length) {
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
      className={classNames(className, s.search)}
    >
      <Input
        className={s.searchInput}
        placeholder="Enter organization name"
        value={search}
        onChange={(value) => setsearch(value)}
      />
      <Button
        className={s.searchBtn}
        disabled={!search.trim()}
        onClick={() => handleSubmit()}
      >
        <img src="/images/search.svg" alt="star-rating" />
      </Button>
    </form>
  );
};

export default Search;
