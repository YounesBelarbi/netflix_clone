"use client";
import useCurrentUser from "@/hooks/useCurrentUser";
import useFavorite from "@/hooks/useFavorite";
import { useCallback, useMemo } from "react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  const { mutate: mutateFavorites } = useFavorite();
  const { data: user, mutate } = useCurrentUser();

  const isFavorite = useMemo(() => {
    const list = Array.isArray(user?.favoriteIds) ? user?.favoriteIds : [];
    console.log("🚀 ~ isFavorite ~ list:", list);
    return list?.includes(movieId);
  }, [user, movieId]);

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isFavorite) {
      response = await fetch("/api/favorite", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }), // Même structure que pour POST
      });
    } else {
      response = await fetch("/api/favorite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }), // Inclut l'ID du film dans le corps
      });
    }

    const updatedFavorites = await response.json();

    mutate({
      ...user,
      favoriteIds: updatedFavorites,
    });
    mutateFavorites();
  }, [isFavorite, movieId, mutate, mutateFavorites, user]);

  const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="group/item flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:size-10"
    >
      <Icon className="text-white" size={25} />
    </div>
  );
};

export default FavoriteButton;
