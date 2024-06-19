import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserType } from '../variables';
import { UserTypeSelect } from './UserTypeSelect';

export function SignUpForm() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleUserTypeSelect = (userType: UserType) => {
    setUserType(userType);

    if (userType === UserType.NonWorker) {
      navigate('/map');
    }
  };

  return (
    <>
      {userType ? (
        <div className='flex w-full flex-col items-center gap-1'>Signup</div>
      ) : (
        <UserTypeSelect onSelect={handleUserTypeSelect} />
      )}
    </>
  );
}
