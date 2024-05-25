import { FaLocationCrosshairs } from 'react-icons/fa6';
import { MapSearchbar } from './MapSearchbar';
import { Worker } from './WorkersMarkers';

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

      <button className='absolute bottom-0 left-0 right-0 mx-auto w-fit !rounded-[0px] !rounded-t-xl bg-accent px-3 py-1 text-white shadow'>
        VIEW {data.length} RESULTS
      </button>
    </>
  );
}
