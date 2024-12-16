import useInfoModal from "@/hooks/useInfoModal";
import useMovie from "@/hooks/useMovie";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import FavoriteButton from "./FavoriteButton";
import PlayButton from "./PlayButton";

interface InfoModalProps {
  visible?: boolean;
  onClose: any;
}

const InfoModal: React.FC<InfoModalProps> = ({ visible, onClose }) => {
  const [isVisible, setIsVisible] = useState(!!visible);
  const { movieId } = useInfoModal();
  const { data = {} } = useMovie(movieId);

  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  const handleClose = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-80 transition duration-300">
      <div className="relative w-auto max-w-3xl overflow-hidden rounded-md">
        <div
          className={`${
            isVisible ? "scale-100" : "scale-0"
          } relative flex-auto bg-zinc-900 drop-shadow-md duration-300`}
        >
          <div className="relative h-96">
            <video
              className="brighness-[60%] size-full object-cover"
              autoPlay
              muted
              loop
              poster={data?.thumbnailUrl}
              src={data?.videoUrl}
            ></video>
            <div
              className="absolute right-3 top-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-70"
              onClick={handleClose}
            >
              <AiOutlineClose
                className="text-white"
                size={20}
                onClick={handleClose}
              />
            </div>
            <div className="absolute bottom-[10%] left-10">
              <p className="mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl">
                {data?.title}
              </p>
              <div className="flex flex-row items-center gap-4">
                <PlayButton movieId={data?.id} />
                <FavoriteButton movieId={data?.id} />
              </div>
            </div>
          </div>
          <div className="px-12 py-8">
            <p className="fontsemibold text-lg text-green-400">Nouveau</p>
            <p className="text-lg text-white">{data?.duration}</p>
            <p className="text-lg text-white">{data?.genre}</p>
            <p className="text-lg text-white">{data?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
