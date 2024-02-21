import React, { useState } from 'react';
import EmployeeTable from '../components/EmployeeTable';
import { Typography } from '@material-tailwind/react';


const EmployeeView = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  return (
    <div>
      <Typography variant='h2' className='text-center my-4'>
        Employee List
      </Typography>

      <EmployeeTable searchQuery={searchQuery} />
    </div>
  );
};

export default EmployeeView;
