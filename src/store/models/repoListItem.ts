import { normalizeOwner, OwnerApi, OwnerModel } from "./repoOwner";

export type RepoListItemApi = {
  description: string;
  id: number;
  name: string;
  owner: OwnerApi;
  stargazers_count: number;
  updated_at: string;
};

export type RepoListItemModel = {
  description: string;
  id: number;
  name: string;
  owner: OwnerModel;
  starCount: number;
  updatedAt: string;
};

export const normalizeRepoListItem = (
  from: RepoListItemApi
): RepoListItemModel => ({
  description: from.description,
  id: from.id,
  name: from.name,
  owner: normalizeOwner(from.owner),
  starCount: from.stargazers_count,
  updatedAt: from.updated_at,
});
