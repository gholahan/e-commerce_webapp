import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "./auth.store";
import { getuserData } from "./auth.api";
import type { User } from "./type";

export const useUser = () => {
  const refreshToken= useAuthStore((s) => s.refreshToken);

  const query = useQuery<User>({
  queryKey: ['user', refreshToken],
  queryFn: getuserData,
  enabled: !!refreshToken,
  staleTime: 1000 * 60 * 5,
  gcTime: 1000 * 60 * 30,
});


  return query;
};


