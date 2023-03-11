import { action, makeObservable, observable } from "mobx";
import qs from "qs";

type PrivateParams = "_params";

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = "";

  constructor() {
    makeObservable<QueryParamsStore, PrivateParams>(this, {
      _params: observable.ref,
      setSearch: action,
    });
  }

  getParam(
    key: string
  ): string | qs.ParsedQs | string[] | qs.ParsedQs[] | undefined {
    return this._params[key];
  }

  prepareSearch(newParam: { [key: string]: string }): string {
    let params = this._params;
    params = { ...params, ...newParam };
    return qs.stringify(params);
  }

  setSearch(search: string) {
    search = search.startsWith("?") ? search.slice(1) : search;

    if (search !== this._search) {
      this._search = search;
      const queryParams = qs.parse(search);

      if (Array.isArray(queryParams?.type)) {
        queryParams.type = queryParams.type[0];
      }
      this._params = queryParams;
    }
  }
}
