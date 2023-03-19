import QueryParamsStore from "./query_params_store";

export default class RootStore {
  readonly query = new QueryParamsStore();
}
