import { BASE_URL } from "@config/constants";
import { ILocalStore } from "@hooks/useLocalStore";
import rootStore from "@store/root_store/instance";
import axios, { isAxiosError } from "axios";
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
  normalizeRepoListItem,
  RepoListItemApi,
  RepoListItemModel,
} from "../models";

export enum Meta {
  IsLoading = "loading",
  Success = "success",
  NotFound = "not found",
  Initial = "initial",
}

type PrivateFields = "_list" | "_meta" | "_org" | "_pageCount";

export default class RepoListStore implements ILocalStore {
  private _list: RepoListItemModel[] = [];
  private _pageCount = 1;
  private _meta: Meta = Meta.Initial;
  private _org = "";

  constructor() {
    makeObservable<RepoListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _org: observable,
      _pageCount: observable,
      meta: computed,
      list: computed,
      pageCount: computed,
      setRepoOwner: action,
    });
  }

  private readonly _changeOrgHandler: IReactionDisposer = reaction(
    () => this._org,
    () => {
      this.getRepoList();
    }
  );
  private readonly _changePageHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("page"),
    () => {
      this.getRepoList();
    }
  );
  private readonly _changeTypeRepoHandler: IReactionDisposer = reaction(
    () => rootStore.query.getParam("type"),
    () => {
      this.getRepoList();
    }
  );

  get list(): RepoListItemModel[] {
    return this._list;
  }

  get meta(): Meta {
    return this._meta;
  }

  get pageCount(): number {
    return this._pageCount;
  }

  setRepoOwner(org: string): void {
    this._org = org;
  }

  async getRepoList(): Promise<void> {
    if (this._meta === Meta.IsLoading) {
      return;
    }
    this._meta = Meta.IsLoading;
    const page = rootStore.query.getParam("page") || 1;
    const typeRepos = rootStore.query.getParam("type") || "all";

    try {
      const response = await axios.get<RepoListItemApi[]>(
        `${BASE_URL}/orgs/${this._org}/repos?page=${page}&type=${typeRepos}&sort=updated`
      );

      let isLastPage = false;
      let pageArr: number[] = [1];
      if (response.headers.link) {
        const urls = (response.headers.link || "").match(/page=.*?(&|>)/g);
        isLastPage = !(response.headers.link || "").includes('rel="last"');
        pageArr = urls
          .map((pageParam: string) => pageParam.replace(/(page=|&|>)/g, ""))
          .map((pageString: string) => +pageString);
      }

      runInAction(() => {
        this._meta = Meta.Success;
        this._list = response.data.map((repos) => normalizeRepoListItem(repos));
        this._pageCount = isLastPage ? +page : +(Math.max(...pageArr) || 1);
      });
    } catch (error) {
      if (isAxiosError(error)) {
        // TODO: test error type
      }
      runInAction(() => {
        this._meta = Meta.NotFound;
        this._list = [];
      });
    }
  }

  destroy(): void {
    this._changeOrgHandler();
    this._changePageHandler();
    this._changeTypeRepoHandler();
  }
}
