import { BASE_URL } from "@config/constants";
import { ILocalStore } from "@hooks/useLocalStore";
import {
  defaultRepoReadme,
  normalizeRepoReadme,
  RepoReadmeApi,
  RepoReadmeModel,
} from "@store/models/repoReadme";
import { Meta } from "@store/repo_list_store/RepoListStore";
import axios from "axios";
import {
  action,
  computed,
  IReactionDisposer,
  makeObservable,
  observable,
  reaction,
  runInAction,
} from "mobx";

type PrivateFields = "_readme" | "_org" | "_repoName" | "_meta";

export default class RepoReadmeStore implements ILocalStore {
  private _readme: RepoReadmeModel = defaultRepoReadme();
  private _meta: Meta = Meta.IsLoading;
  private _org = "";
  private _repoName = "";

  constructor() {
    makeObservable<RepoReadmeStore, PrivateFields>(this, {
      _readme: observable.ref,
      _org: observable,
      _repoName: observable,
      _meta: observable,
      meta: computed,
      readme: computed,
      setRepoParams: action,
    });
  }

  private readonly _readmeHandlerReaction: IReactionDisposer = reaction(
    () => this._org,
    () => this.getRepoReadme(this._org, this._repoName)
  );

  get readme(): RepoReadmeModel {
    return this._readme;
  }

  get meta(): Meta {
    return this._meta;
  }

  setRepoParams(org: string, repoName: string): void {
    this._org = org;
    this._repoName = repoName;
  }

  async getRepoReadme(org: string, repo: string): Promise<void> {
    this._meta = Meta.IsLoading;

    try {
      const response = await axios.get<RepoReadmeApi>(
        `${BASE_URL}/repos/${org}/${repo}/readme`,
        {
          // headers: { Accept: "application/vnd.github.html+json" },
          headers: { Accept: "application/vnd.github+json" },
        }
      );

      runInAction(() => {
        this._meta = Meta.Success;
        this._readme = normalizeRepoReadme(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.NotFound;
        this._readme = defaultRepoReadme();
      });
    }
  }

  destroy(): void {
    this._readmeHandlerReaction();
  }
}
