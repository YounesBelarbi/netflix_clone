import { isEmpty } from "lodash";
import MovieCard from "./MovieCard";

interface MovieListProps {
  data: {
    id: string;
    thumbnailUrl: string;
    duration: string;
    genre: string;
    videoUrl: string;
  }[];
  title: string;
}
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="mt-4 space-y-5 px-4 md:px-12">
      <div className="text-md mb-4 font-semibold text-white md:text-xl lg:text-2xl">
        <p>{title}</p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
