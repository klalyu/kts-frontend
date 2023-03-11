import { OwnerApi } from "./repoOwner";

export type RepoItemApi = {
  name: string;
  full_name: string;
  owner: OwnerApi;
  description: string;
  homepage: string;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  topics: string[];
};

export type RepoItemModel = {
  organization: string;
  homepage: string | null;
  repoFullName: string;
  topics: string[];
  starCount: number;
  watchCount: number;
  forkCount: number;
};

export const normalizeRepoItem = (from: RepoItemApi): RepoItemModel => ({
  organization: from.owner.login,
  homepage: from.homepage || null,
  repoFullName: from.full_name,
  topics: from.topics,
  starCount: from.stargazers_count,
  watchCount: from.watchers_count,
  forkCount: from.forks_count,
});

export const defaultRepoItem = (): RepoItemModel => ({
  organization: "",
  homepage: null,
  repoFullName: "",
  topics: [],
  starCount: 0,
  watchCount: 0,
  forkCount: 0,
});
