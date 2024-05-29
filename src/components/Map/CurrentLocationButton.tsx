import { FaLocationCrosshairs } from 'react-icons/fa6';
import { RecenterEvent } from './MapSearchbar';

type Props = { onRecenter: RecenterEvent };

export function CurrentLocationButton({ onRecenter }: Props) {
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
    <button
      className='absolute right-0 top-[calc(100vh-300px)] mx-2 rounded-full bg-accent p-2 text-[24px] text-white shadow'
      onClick={getUserLocation}
    >
      <FaLocationCrosshairs />
    </button>
  );
}
