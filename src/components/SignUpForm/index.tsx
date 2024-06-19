import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { MyTextInput } from '../InputFields';
import { LocationSelect } from '../Map/LocationSelect';
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
        <div className='flex flex-col items-center gap-10 py-10'>
          <h1 className='text-tertiary'>Sign up</h1>
          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              contactNumber: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, 'Must be 20 characters or less')
                .required('Required'),
              lastName: Yup.string()
                .max(20, 'Must be 20 characters or less')
                .required('Required'),
              contactNumber: Yup.number()
                .positive('Invalid contact number')
                .required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form className='flex flex-col items-center gap-4'>
              <MyTextInput
                label='First Name'
                name='firstName'
                type='text'
                placeholder='First Name'
              />

              <MyTextInput
                label='Last Name'
                name='lastName'
                type='text'
                placeholder='Last Name'
              />

              <MyTextInput
                label='Contact Number'
                name='contactNumber'
                type='number'
                placeholder='09*********'
              />

              <LocationSelect />

              <button
                className='mt-7 rounded-full bg-brand-light text-2xl text-white'
                type='submit'
              >
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      ) : (
        <UserTypeSelect onSelect={handleUserTypeSelect} />
      )}
    </>
  );
}
