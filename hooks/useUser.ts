import { getfullUrl } from "@/lib/getfullUrl";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useUser = () => {
  const { data, error, isLoading } = useSWR("/api/user/getuser", fetcher);
  // 이미 캐시된 USER가 있으면 그걸 사용하고. 다시 FETCH해서 최신화된 데이터를 받아오는.
  return { data, error, isLoading };
};
