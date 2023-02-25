import React from "react";

import { useRepositoryReadmeQuery } from "@hooks/useRepositoryReadmeQuery";
import { marked } from "marked";

import s from "./Readme.module.scss";

export type ReadmeDataProps = {
  name: string;
  content: string;
};

type ReadmeProps = {
  org: string;
  repoName: string;
};

const Readme: React.FC<ReadmeProps> = ({ org, repoName }) => {
  const { data, isLoading, isSuccess } = useRepositoryReadmeQuery(
    org,
    repoName
  );

  if (!isLoading && !isSuccess) {
    return <h1>Error (show detail?...)</h1>;
  }

  if (isLoading) {
    return <></>;
  }

  return (
    <div className={s.readme}>
      <h2 className={s.readme__name}>{data.name}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: marked.parse(data.content),
        }}
      ></div>
    </div>
  );
};

export default Readme;
