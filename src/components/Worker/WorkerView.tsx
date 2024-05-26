import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { workers } from '../mockData';

export type Worker = (typeof workers)[number];

export function WorkerView({ data }: { data: Worker }) {
  const { firstName, lastName, jobsAccomplished, rating, image } = data;

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

    return <div className='text-yellow-star flex gap-1 text-lg'>{stars}</div>;
  };

  return (
    <div className='flex flex-col items-center gap-[6px] rounded p-1'>
      <img src={image} className='size-[50px] rounded-full' />
      <p className='text-[24px] leading-6'>
        {firstName} {lastName}
      </p>
      <Stars count={rating} />
      <p className='text-sm leading-[14px]'>
        {jobsAccomplished} jobs accomplished
      </p>
    </div>
  );
}
