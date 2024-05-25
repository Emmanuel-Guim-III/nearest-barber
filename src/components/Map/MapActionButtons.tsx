import { FaLocationCrosshairs } from 'react-icons/fa6';
import { Worker } from '../Worker/WorkerView';
import { MapSearchbar } from './MapSearchbar';
import { ViewNResults } from './ViewNResult';

export type RecenterEvent = (center: { lat: number; lng: number }) => void;

type Props = {
  data: Worker[];
  onRecenter: RecenterEvent;
};

export function MapActionButtons({ data, onRecenter }: Props) {
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(position.coords);
          onRecenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error get user location: ', error);
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  return (
    <>
      <MapSearchbar onRecenter={onRecenter} />

      <button
        className='absolute right-0 top-[calc(100vh-250px)] mx-2 rounded-full bg-accent p-2 text-[24px] text-white shadow'
        onClick={getUserLocation}
      >
        <FaLocationCrosshairs />
      </button>

      <ViewNResults data={data} />
    </>
  );
}
