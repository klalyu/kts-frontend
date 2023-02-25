import { fetchRepositoryReadme } from "@services/allfetch";
import { useQuery } from "@tanstack/react-query";

const useRepositoryReadmeQuery = (org: string, repo: string) => {
  return useQuery({
    queryFn: () => fetchRepositoryReadme({ org, repo }),
    queryKey: ["repository-readme", org, repo],
    staleTime: 1000 * 5,
    retry: false,
    onError: (err) => {
      // тут можно бы сообщить об ошибке
    },
  });
};

export { useRepositoryReadmeQuery };
