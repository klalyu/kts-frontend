import { WithLoader } from "@components/WithLoader/WithLoader";
import { useRepositoryDataQuery } from "@hooks/useRepositoryDataQuery";
import { urlHostWithPath } from "@utils/formatter";

import Header from "./components/header";
import Link from "./components/link";
import Readme from "./components/readme";
import Stats from "./components/stats";
import Topics from "./components/topics";
import s from "./Repository.module.scss";

export type RepositoryProps = {
  organization: string;
  homepage?: string;
  repoFullName: string;
  topics: string[];
  stars: number;
  watching: number;
  forks: number;
};

type RepositoryPageProps = {
  params: {
    org: string;
    repoName: string;
  };
};

const RepositoryPage: React.FC<RepositoryPageProps> = ({ params }) => {
  const { data, isLoading, isSuccess } = useRepositoryDataQuery(
    params.org,
    params.repoName
  );

  if (!isLoading && !isSuccess) {
    return <h1>Error</h1>;
  }

  return (
    <WithLoader loading={isLoading}>
      {isLoading && <h1>loading...</h1>}
      {!isLoading && (
        <>
          <Header organization={data.organization} title={data.repoFullName} />
          <div className={s.repository__body}>
            {!!data.homepage && (
              <Link url={data.homepage} text={urlHostWithPath(data.homepage)} />
            )}
            {data.topics.length > 0 && <Topics topics={data.topics} />}
            <Stats
              stars={data.stars}
              forks={data.forks}
              watch={data.watching}
            />
            <Readme org={params.org} repoName={params.repoName} />
          </div>
        </>
      )}
    </WithLoader>
  );
};

export default RepositoryPage;
