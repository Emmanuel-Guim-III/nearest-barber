import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { useSwipeable } from 'react-swipeable';
import { Worker } from './WorkerView';

type Props = {
  data: Worker[];
  isToggledOn: boolean;
  onToggle: (v: boolean) => void;
};

const VARIANTS = {
  open: { y: -250 },
  closed: { y: 0 },
};

const SPRING = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export function WorkerListToggle({ data, isToggledOn, onToggle }: Props) {
  const controls = useAnimationControls();

  useEffect(() => {
    controls.start(isToggledOn ? 'open' : 'closed');
  }, [controls, isToggledOn]);

  const handlers = useSwipeable({
    onSwipedUp: () => onToggle(true),
    onTap: () => onToggle(false),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div className='absolute bottom-0 left-0 right-0'>
      <motion.button
        {...handlers}
        animate={controls}
        transition={SPRING}
        variants={VARIANTS}
        className={classNames(
          'mx-auto w-fit shadow-md',
          isToggledOn
            ? '!rounded-full bg-accent/70 p-2 text-white/70'
            : 'flex items-center justify-center !rounded-[0px] !rounded-t-xl bg-accent px-3 py-1 text-white',
        )}
      >
        {isToggledOn ? <FaXmark /> : `VIEW ${data.length} RESULTS`}
      </motion.button>
    </div>
  );
}
