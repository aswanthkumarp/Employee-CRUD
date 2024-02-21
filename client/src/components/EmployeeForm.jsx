import { Typography, Card, Input, Button } from '@material-tailwind/react';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toast, showToast } from './Toast';

const EmployeeForm = () => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    address: '',
    designation: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateEmployee = async (e) => {
    e.preventDefault();
    if (!newEmployee.name || !newEmployee.address || !newEmployee.designation) {
      showToast('Please fill in all required fields', 'error');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:3001/employees',
        newEmployee
      );

      setNewEmployee({ name: '', address: '', designation: '' });
      showToast('Employee created successfully', 'success');
      navigate('/view');
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || 'An error occurred';
      showToast(errorMessage, 'error');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center '>
      <Card color='white' shadow={false} className='border rounded p-4'>
        <Typography variant='h4' color='blue' className='text-center mt-2'>
          Employee Details
        </Typography>
        <Typography color='gray' className='mt-1 font-normal text-center'>
          Nice to meet you! Enter your details to register.
        </Typography>
        <form
          className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
          onSubmit={handleCreateEmployee}
        >
          <div className='mb-1 flex flex-col gap-6'>
            <Typography variant='h6' color='blue-gray' className='-mb-3'>
              Full Name
            </Typography>
            <Input
              size='lg'
              placeholder='John Doe'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name='name'
              value={newEmployee.name}
              onChange={handleInputChange}
              required
            />
            <Typography variant='h6' color='blue-gray' className='-mb-3'>
              Address
            </Typography>
            <Input
              size='lg'
              placeholder='123 Street,NY'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              value={newEmployee.address}
              onChange={handleInputChange}
              name='address'
              required
            />
            <Typography variant='h6' color='blue-gray' className='-mb-3'>
              Role/Position
            </Typography>
            <Input
              type='text'
              size='lg'
              placeholder='Contractor'
              className=' !border-t-blue-gray-200 focus:!border-t-gray-900'
              labelProps={{
                className: 'before:content-none after:content-none',
              }}
              name='designation'
              value={newEmployee.designation}
              onChange={handleInputChange}
              required
            />
          </div>

          <Button className='mt-6' fullWidth type='submit'>
            Add Employee
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default EmployeeForm;
