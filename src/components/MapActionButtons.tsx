import { FaLocationCrosshairs } from 'react-icons/fa6';

type Props = {
  total: number;
  onCurrentLocationClick: () => void;
};

export function MapActionButtons({ total, onCurrentLocationClick }: Props) {
  return (
    <>
      <button
        className="absolute top-[calc(100vh-250px)] right-0 rounded-full text-[24px] p-2 shadow mx-2 text-white bg-accent"
        onClick={onCurrentLocationClick}
      >
        <FaLocationCrosshairs />
      </button>

      <button className="absolute bottom-0 !rounded-t-xl !rounded-[0px] right-0 left-0 mx-auto py-1 px-3 shadow text-white bg-accent w-fit">
        VIEW {total} RESULTS
      </button>
    </>
  );
}
