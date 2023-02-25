import { fetchOrgRepos } from "@services/allfetch";
import { useQuery } from "@tanstack/react-query";

const useOrgsRepos = (org: string) => {
  const url: URL = new URL(window.location.href);
  const page = +(url.searchParams.get("page") || 1);

  return useQuery({
    queryFn: () => fetchOrgRepos({ org, page }),
    queryKey: ["org-repos", org, page],
    staleTime: 1000 * 5,
    keepPreviousData: true,
    onError: (err) => {
      // тут можно бы сообщить об ошибке
    },
  });
};

export { useOrgsRepos };
