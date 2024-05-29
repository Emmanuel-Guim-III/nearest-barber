import { FaLocationCrosshairs } from 'react-icons/fa6';
import { RecenterEvent } from './MapSearchbar';

type Props = { onRecenter: RecenterEvent };

export function CurrentLocationButton({ onRecenter }: Props) {
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onRecenter({ lat: latitude, lng: longitude });
        },
        (error) => {
          alert(error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
        },
      );
    } else {
      console.log('Geolocation is not supported by this browser');
    }
  };

  return (
    <button
      className='absolute right-0 top-[calc(100vh-300px)] mx-2 rounded-full bg-brand p-2 text-[24px] text-white shadow'
      onClick={getUserLocation}
    >
      <FaLocationCrosshairs />
    </button>
  );
}
