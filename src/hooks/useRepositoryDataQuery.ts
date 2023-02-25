import { fetchRepositoryData } from "@services/allfetch";
import { useQuery } from "@tanstack/react-query";

const useRepositoryDataQuery = (org: string, repo: string) => {
  return useQuery({
    queryFn: () => fetchRepositoryData({ org, repo }),
    queryKey: ["repository", org, repo],
    staleTime: 1000 * 5,
    retry: false,
    onError: (err) => {
      // тут можно бы сообщить об ошибке
    },
  });
};

export { useRepositoryDataQuery };
