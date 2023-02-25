import { OrgRepositoriesProps } from "@pages/org_repositories_page/OrgRepositoriesPage";
import { ReadmeDataProps } from "@pages/repository_page/components/readme/Readme";
import { RepositoryProps } from "@pages/repository_page/RepositoryPage";
import axios from "axios";

const BASE_URL = "https://api.github.com";

interface Owner {
  login: string;
  avatar_url: string;
}

interface OrgReposRes {
  id: number;
  name: string;
  owner: Owner;
  description: string;
  stargazers_count: number;
  updated_at: string;
}

export async function fetchOrgRepos({
  org,
  page,
}: {
  org: string;
  page: number;
}): Promise<OrgRepositoriesProps> {
  try {
    const resp = await axios.get<OrgReposRes[]>(
      `${BASE_URL}/orgs/${org}/repos?page=${page}&sort=updated`
    );

    return {
      items: resp.data.map((item) => ({
        description: item.description,
        id: item.id,
        name: item.name,
        org: item.owner.login,
        orgAvatar: item.owner.avatar_url,
        stars: item.stargazers_count,
        updatedAt: item.updated_at,
      })),
      isNext: resp.headers.link?.includes('rel="next"'),
      isPrev: resp.headers.link?.includes('rel="prev"'),
    };
  } catch (error) {
    return Promise.reject("error");
  }
}

interface RepositoryResp {
  name: string;
  full_name: string;
  owner: Owner;
  description: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
}

export async function fetchRepositoryData({
  org,
  repo,
}: {
  org: string;
  repo: string;
}): Promise<RepositoryProps> {
  try {
    const resp = await axios.get<RepositoryResp>(
      `${BASE_URL}/repos/${org}/${repo}`
    );

    return {
      homepage: resp.data.homepage,
      organization: resp.data.owner.login,
      topics: resp.data.topics,
      repoFullName: resp.data.full_name,
      stars: resp.data.stargazers_count,
      watching: resp.data.watchers_count,
      forks: resp.data.forks_count,
    };
  } catch (error) {
    return Promise.reject("error");
  }
}

interface RepositoryReadmeResp {
  name: string;
  content: string;
}

export async function fetchRepositoryReadme({
  org,
  repo,
}: {
  org: string;
  repo: string;
}): Promise<ReadmeDataProps> {
  try {
    const resp = await axios.get<RepositoryReadmeResp>(
      `${BASE_URL}/repos/${org}/${repo}/readme`,
      {
        // headers: { Accept: "application/vnd.github.html+json" },
        headers: { Accept: "application/vnd.github+json" },
      }
    );

    return {
      content: decodeURIComponent(escape(atob(resp.data.content))),
      name: resp.data.name,
    };
  } catch (error) {
    return Promise.reject("error");
  }
}
