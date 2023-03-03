export type RepoReadmeApi = {
  content: string;
  name: string;
};

export type RepoReadmeModel = {
  content: string;
  name: string;
};

export const normalizeRepoReadme = (from: RepoReadmeApi): RepoReadmeModel => ({
  content: decodeURIComponent(escape(atob(from.content))),
  name: from.name,
});

export const defaultRepoReadme = (): RepoReadmeModel => ({
  content: "",
  name: "",
});
