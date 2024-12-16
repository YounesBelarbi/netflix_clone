"use client";
import useMovie from "@/hooks/useMovie";
import { useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";

const WatchClient = ({ movieId }: { movieId: string }) => {
  const router = useRouter();
  const { data } = useMovie(movieId);

  return (
    <div className="h-screen w-screen bg-black">
      <nav className="fixed z-10 flex w-full flex-row items-center gap-8 bg-black bg-opacity-70 p-4">
        <AiOutlineArrowLeft
          onClick={() => router.push("/")}
          className="cursor-pointer text-white"
          size={40}
        />
        <p className="text-1xl font-bold text-white md:text-3xl">
          <span className="font-light">Regarder </span>
          {data?.title}
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="size-full object-cover"
        src={data?.videoUrl}
      ></video>
    </div>
  );
};

export default WatchClient;
