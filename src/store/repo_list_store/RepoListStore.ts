import { BASE_URL } from "@config/constants";
import { ILocalStore } from "@hooks/useLocalStore";
import rootStore from "@store/root_store/instance";
import axios, { isAxiosError } from "axios";
import {
  action,
  computed,
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
  IsLoading = 1,
  Success = 2,
  NotFound = 4,
}

type PrivateFields = "_list" | "_meta" | "_org" | "_pageCount" | "_currentPage";

export default class RepoListStore implements ILocalStore {
  private _list: RepoListItemModel[] = [];
  private _pageCount = 1;
  private _currentPage = 1;
  private _meta: Meta = Meta.IsLoading;
  private _org = "";

  constructor() {
    makeObservable<RepoListStore, PrivateFields>(this, {
      _list: observable.ref,
      _meta: observable,
      _org: observable,
      _pageCount: observable,
      _currentPage: observable,
      meta: computed,
      list: computed,
      pageCount: computed,
      setRepoOwner: action,
    });

    reaction(
      () => this._org,
      () => {
        this.getRepoList(this._org);
      }
    );

    reaction(
      () => rootStore.query.getParam("page"),
      () => {
        this.setCurrentPage(+(rootStore.query.getParam("page") || 1));
      }
    );

    reaction(
      () => this._currentPage,
      () => {
        this.getRepoList(this._org);
      }
    );
  }

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

  setCurrentPage(page: number): void {
    this._currentPage = page;
  }

  async getRepoList(org: string): Promise<void> {
    this._meta = Meta.IsLoading;
    const page = rootStore.query.getParam("page") || 1;

    try {
      const response = await axios.get<RepoListItemApi[]>(
        `${BASE_URL}/orgs/${org}/repos?page=${page}&sort=updated`
      );
      const urls = (response.headers.link || "").match(/page=.*?(&|>)/g);
      const isLastPage = !(response.headers.link || "").includes('rel="last"');
      const pageArr = urls
        .map((pageParam: string) => pageParam.replace(/(page=|&|>)/g, ""))
        .map((pageString: string) => +pageString);
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

  destroy(): void {}
}
