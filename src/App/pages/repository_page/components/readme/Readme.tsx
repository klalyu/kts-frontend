import React, { useEffect } from "react";

import { useLocalStore } from "@hooks/useLocalStore";
import { Meta } from "@store/repo_list_store/RepoListStore";
import RepoReadmeStore from "@store/repo_readme_store/RepoReadmeStore";
import { marked } from "marked";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";

import s from "./Readme.module.scss";

const Readme: React.FC = () => {
  const { org, repoName } = useParams();
  const repoReadmeStore = useLocalStore(() => new RepoReadmeStore());

  useEffect(() => {
    repoReadmeStore.setRepoParams(String(org), String(repoName));
  }, [repoReadmeStore, org, repoName]);

  const { meta, readme } = repoReadmeStore;

  if (meta === Meta.NotFound) {
    return <h3>Readme not found</h3>;
  }

  return (
    <div className={s.readme}>
      <h2 className={s.readme__name}>{readme.name}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(readme.content),
        }}
      ></div>
    </div>
  );
};

export default observer(Readme);
