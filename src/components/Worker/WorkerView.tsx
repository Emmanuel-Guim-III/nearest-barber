import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { Fragment } from 'react/jsx-runtime';
import { workers } from '../mockData';

export type Worker = (typeof workers)[number];

type Props = { data: Worker };

const Stars = ({ count }: { count: number }) => {
  const stars = [];
  const fullStars = Math.floor(count);
  const hasHalfStar = count % 1 !== 0;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<FaStar />);
  }

  if (hasHalfStar) stars.push(<FaStarHalfAlt />);

  const totalStars = fullStars + (hasHalfStar ? 1 : 0);
  for (let i = totalStars; i < 5; i++) {
    stars.push(<FaRegStar />);
  }

  return (
    <div className='flex gap-1 text-lg text-yellow-star'>
      {stars.map((star, i) => (
        <Fragment key={i}>{star}</Fragment>
      ))}
    </div>
  );
};

export function WorkerView({ data }: Props) {
  const { firstName, lastName, jobsAccomplished, rating, image } = data;

  return (
    <div className='flex w-[150px] flex-col items-center gap-3 rounded bg-base p-3 shadow-md'>
      <div className='flex flex-col items-center gap-2'>
        <img src={image} className='size-[50px] rounded-full' />
        <p className='min-h-9 text-lg leading-[18px]'>
          {firstName} {lastName}
        </p>
      </div>

      <div className='flex flex-col items-center gap-2'>
        <Stars count={rating} />
        <p className='text-sm leading-[14px]'>
          {jobsAccomplished} jobs accomplished
        </p>
      </div>
    </div>
  );
}
