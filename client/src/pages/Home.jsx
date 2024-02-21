import { Typography, Button } from '@material-tailwind/react';
import React from 'react';
import { NavbarComponent } from '../components/NavbarComponent';

const Home = () => {
  return (
    <div className='flex gap-9  mt-8 items-center justify-center'>
      <Typography variant='h2'>Welcome to Employee Database</Typography>
    </div>
  );
};

export default Home;
