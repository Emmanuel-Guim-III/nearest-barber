import { FaSearch } from 'react-icons/fa';
import { GoogleAutoComplete } from './GoogleAutoComplete';
import { RecenterEvent } from './MapActionButtons';

type Props = { onRecenter: RecenterEvent };

export function MapSearchbar({ onRecenter }: Props) {
  const handlePlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    const lat = place?.geometry?.location?.lat();
    const lng = place?.geometry?.location?.lng();

    if (!lat || !lng) return;

    const center = { lat, lng };
    onRecenter(center);
  };

  return (
    <div className='absolute left-0 right-0 top-10 bg-transparent px-2 '>
      <div className='flex w-full items-center gap-2 rounded-lg bg-base/90 px-4 py-2 shadow-lg'>
        <FaSearch className='text-[20px] text-tertiary' />

        <GoogleAutoComplete
          onPlaceSelect={handlePlaceSelect}
          className='w-full bg-transparent text-[18px]'
        />
      </div>
    </div>
  );
}
