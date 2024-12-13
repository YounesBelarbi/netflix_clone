"use client";

import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import Navbar from "@/components/Navbar";
import useFavorite from "@/hooks/useFavorite";
import useMovieList from "@/hooks/useMovieList";

export default function Home() {
  const { data: movies = [] } = useMovieList();
  const { data: falvoriteMovies = [] } = useFavorite();
  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        <MovieList title="Tendance actuelle" data={movies} />
        <MovieList title="Ma liste" data={falvoriteMovies} />
      </div>
    </>
  );
}
