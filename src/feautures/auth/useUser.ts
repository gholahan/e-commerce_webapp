import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./auth.store";
import { getuserData } from "./auth.api";

export const useUser = () => {
  const accessToken = useAuthStore((s) => s.accessToken);

  const query = useQuery({
    queryKey: ['user', accessToken],
    queryFn: getuserData,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
  });

  return query;
};


