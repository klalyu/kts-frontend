import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer, useLocalStore } from "mobx-react-lite";

import { WithLoader } from "@components/WithLoader/WithLoader";
import RepoItemStore from "@store/repo_item_store";
import { Meta } from "@store/repo_list_store/RepoListStore";
import { urlHostWithPath } from "@utils/formatter";
import Header from "../header";
import Link from "../link";
import Stats from "../stats";
import Topics from "../topics";

import s from "./Metadata.module.scss";

const Metadata: React.FC = () => {
  const { org, repoName } = useParams();
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  useEffect(() => {
    repoItemStore.setRepoParams(String(org), String(repoName));
  }, [repoItemStore, org, repoName]);

  const { meta, repoData } = repoItemStore;

  if (meta === Meta.NotFound) {
    return <>Not found</>;
  }
  return (
    <WithLoader loading={meta === Meta.IsLoading}>
      <Header
        organization={repoData.organization}
        title={repoData.repoFullName}
      />
      <div className={s.repoMetaData}>
        {repoData.homepage !== null && (
          <Link
            url={repoData.homepage}
            text={urlHostWithPath(repoData.homepage)}
          />
        )}
        {repoData.topics.length > 0 && <Topics topics={repoData.topics} />}
        <Stats
          stars={repoData.starCount}
          forks={repoData.forkCount}
          watch={repoData.watchCount}
        />
      </div>
    </WithLoader>
  );
};

export default observer(Metadata);
