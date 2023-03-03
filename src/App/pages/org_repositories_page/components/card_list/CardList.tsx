import { useEffect } from "react";

import { Card } from "@components/Card";
import { WithLoader } from "@components/WithLoader/WithLoader";
import RepoListStore, { Meta } from "@store/repo_list_store/RepoListStore";
import { useQueryParamsStore } from "@store/root_store/hooks/useQueryParamsStore";
import { observer, useLocalStore } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

import s from "./CardList.module.scss";
import CardContent from "../card_content";
import Pagination from "../pagination";

const CardList: React.FC = () => {
  useQueryParamsStore();
  const { org } = useParams();
  const navigate = useNavigate();
  const repoListStore = useLocalStore(() => new RepoListStore());
  const { list, meta, pageCount } = repoListStore;

  useEffect(() => {
    repoListStore.setRepoOwner(org || "");
  }, [repoListStore, org]);

  if (meta === Meta.NotFound) {
    return <>Sorry, organization {org} not found</>;
  }

  if (meta === Meta.Success && list.length === 0) {
    return <>Repos list empty</>;
  }

  return (
    <>
      <WithLoader loading={meta === Meta.IsLoading} className={s.cardList}>
        {list.map((repository) => (
          <Card
            image={repository.owner.avatarUrl}
            key={repository.id}
            title={repository.name}
            subtitle={repository.description}
            content={
              <CardContent
                stars={repository.starCount}
                date={repository.updatedAt}
              />
            }
            onClick={() =>
              navigate(
                `/repositories/${repository.owner.name}/${repository.name}`
              )
            }
          />
        ))}
      </WithLoader>
      <Pagination pageCount={pageCount} />
    </>
  );
};

export default observer(CardList);
