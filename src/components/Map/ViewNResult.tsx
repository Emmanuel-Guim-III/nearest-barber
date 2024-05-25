import { useSwipeable } from 'react-swipeable';
import { Worker } from '../Worker/WorkerView';

type Props = { data: Worker[] };

export function ViewNResults({ data }: Props) {
  const handlers = useSwipeable({
    onSwipedUp: () => console.log('up'),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <button
      {...handlers}
      className='absolute bottom-0 left-0 right-0 mx-auto w-fit !rounded-[0px] !rounded-t-xl bg-accent px-3 py-1 text-white shadow'
    >
      VIEW {data.length} RESULTS
    </button>
  );
}
