import React from "react";

import { Button } from "@components/Button/Button";
import { WithLoader } from "@components/WithLoader/WithLoader";
import { useOrgsRepos } from "@hooks/useOrgReposQuery";
import { useLocation } from "wouter";

import CardList from "./components/card_list/CardList";
import Header from "./components/header";
import s from "./OrgRepositoriesPage.module.scss";

type OrgRepositoriesPageProps = {
  params: {
    org: string;
  };
};

type RepositoryProps = {
  description: string;
  id: number;
  name: string;
  org: string;
  orgAvatar: string;
  stars: number;
  updatedAt: string;
};

export type OrgRepositoriesProps = {
  items: RepositoryProps[];
  isPrev?: boolean;
  isNext?: boolean;
};

const OrgRepositoriesPage: React.FC<OrgRepositoriesPageProps> = ({
  params,
}) => {
  const [page, setpage] = React.useState(1);
  const [location, navigate] = useLocation();
  const { data, isLoading, isSuccess } = useOrgsRepos(params.org);

  const handleNavigatePage = (delta: number) => {
    window.scrollTo(0, 0);
    setpage(page + delta);
    navigate(`${location}?page=${page + delta}`);
  };

  if (!isLoading && !isSuccess) {
    return <h1>Error</h1>;
  }

  return (
    <WithLoader loading={isLoading}>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && (
        <div className={s.repositoriesPage}>
          <Header />
          <CardList items={data.items} />
          <div className={s.repositoriesPage__navigation}>
            <Button
              disabled={!data.isPrev}
              onClick={() => handleNavigatePage(-1)}
            >
              &lt;Prev
            </Button>
            <Button
              disabled={!data.isNext}
              onClick={() => handleNavigatePage(1)}
            >
              Next&gt;
            </Button>
          </div>
        </div>
      )}
    </WithLoader>
  );
};

export default OrgRepositoriesPage;
