import WatchClient from "@/components/WatchClient";

interface WatchProps {
  params: Promise<{ movieId: string }>;
}

const Watch = async ({ params }: WatchProps) => {
  const movieId = (await params).movieId;
  return <WatchClient movieId={movieId} />;
};

export default Watch;
