import { BASE_URL } from "@config/constants";
import { ILocalStore } from "@hooks/useLocalStore";
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

import {
  defaultRepoItem,
  normalizeRepoItem,
  RepoItemApi,
} from "./../models/repoItem";
import { RepoItemModel } from "../models";
import { Meta } from "@store/repo_list_store/RepoListStore";

type PrivateFields = "_repoData" | "_meta" | "_org" | "_repoName";

export default class RepoItemStore implements ILocalStore {
  private _repoData: RepoItemModel = defaultRepoItem();
  private _meta: Meta = Meta.Initial;
  private _org = "";
  private _repoName = "";

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _repoData: observable.ref,
      _meta: observable,
      _org: observable,
      _repoName: observable,
      meta: computed,
      repoData: computed,
      setRepoParams: action,
    });
  }

  private readonly _orgChangeHandlerReaction: IReactionDisposer = reaction(
    () => this._org,
    () => this.getRepoData(this._org, this._repoName)
  );

  get repoData(): RepoItemModel {
    return this._repoData;
  }

  get meta(): Meta {
    return this._meta;
  }

  setRepoParams(org: string, repoName: string): void {
    this._org = org;
    this._repoName = repoName;
  }

  async getRepoData(org: string, repoName: string): Promise<void> {
    this._meta = Meta.IsLoading;
    try {
      const response = await axios.get<RepoItemApi>(
        `${BASE_URL}/repos/${org}/${repoName}`
      );
      runInAction(() => {
        this._meta = Meta.Success;
        this._repoData = normalizeRepoItem(response.data);
      });
    } catch (error) {
      runInAction(() => {
        this._meta = Meta.NotFound;
        this._repoData = defaultRepoItem();
      });
    }
  }

  destroy(): void {
    this._orgChangeHandlerReaction();
  }
}
