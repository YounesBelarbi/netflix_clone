import fetcher from "@/lib/fetcher";
import useSWR from "swr";

const useFavorite = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/favoriteMovies`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  return { data, error, isLoading, mutate };
};

export default useFavorite;
