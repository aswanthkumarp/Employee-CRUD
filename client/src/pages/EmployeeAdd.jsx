import React from 'react';
import EmployeeForm from '../components/EmployeeForm';
import { Typography } from '@material-tailwind/react';

const EmployeeAdd = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <EmployeeForm />
    </div>
  );
};

export default EmployeeAdd;
