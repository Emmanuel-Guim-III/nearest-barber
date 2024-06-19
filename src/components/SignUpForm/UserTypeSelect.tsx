import { ReactNode } from 'react';
import { UserType } from '../variables';

const Button = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => (
  <button
    className='max-w-[200px] rounded-full border-2 border-brand px-5 py-2 text-2xl text-brand shadow-md hover:bg-brand hover:text-white'
    onClick={onClick}
  >
    {children}
  </button>
);

export function UserTypeSelect({
  onSelect,
}: {
  onSelect: (userType: UserType) => void;
}) {
  return (
    <div className='flex w-full flex-col items-center gap-6'>
      <Button onClick={() => onSelect(UserType.Worker)}>
        I'm a hairstylist
      </Button>
      <p className='text-xl text-tertiary'>or</p>
      <Button onClick={() => onSelect(UserType.NonWorker)}>
        I need a haircut
      </Button>
    </div>
  );
}
