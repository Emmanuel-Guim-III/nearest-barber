import classNames from 'classnames';
import { motion, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { Worker } from '../Worker/WorkerView';

type Props = { data: Worker[] };

const VARIANTS = {
  open: { y: -200, opacity: 0.5, scale: 0.8 },
  closed: { y: 0, opacity: 1, scale: 1 },
};

const SPRING = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

export function ViewNResults({ data }: Props) {
  const controls = useAnimationControls();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    controls.start(isOpen ? 'open' : 'closed');
  }, [controls, isOpen]);

  const handlers = useSwipeable({
    onSwipedUp: () => setIsOpen(true),
    onSwipedDown: () => setIsOpen(false),
    swipeDuration: 500,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <motion.button
      {...handlers}
      animate={controls}
      transition={SPRING}
      variants={VARIANTS}
      className={classNames(
        'absolute bottom-0 left-0 right-0 mx-auto w-fit bg-accent px-3 py-1 text-white shadow',
        isOpen ? '!rounded-xl' : '!rounded-[0px] !rounded-t-xl',
      )}
    >
      {isOpen ? 'SWIPE DOWN TO CLOSE' : `VIEW ${data.length} RESULTS`}
    </motion.button>
  );
}
