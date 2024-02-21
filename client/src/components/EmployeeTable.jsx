import { Card, Typography, Button, Input } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from './Toast';

const TABLE_HEAD = ['Name', 'Address', 'Designation', 'Operations'];

export default function EmployeeTable() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState('');
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    address: '',
    designation: '',
  });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/getEmployees');
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getEmployees', {
        params: {
          name: search,
          address: search,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClear = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getEmployees');
      setEmployees(response.data);
      setSearch('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/employees/${id}`);
      const updatedEmployees = employees.filter(
        (employee) => employee._id !== id
      );
      setEmployees(updatedEmployees);
      showToast('Employee deleted successfully', 'success');
    } catch (error) {
      console.error(error);
      showToast('some error is deletion', 'error');
    }
  };

  const handleEdit = (employee) => {
    setEditingEmployeeId(employee._id);
    setNewEmployee({
      name: employee.name,
      address: employee.address,
      designation: employee.designation,
    });
  };

  const handleCancelEdit = () => {
    setEditingEmployeeId(null);
    setNewEmployee({ name: '', address: '', designation: '' });
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:3001/employees/${editingEmployeeId}`, {
        name: newEmployee.name,
        address: newEmployee.address,
        designation: newEmployee.designation,
      });

      const updatedEmployees = employees.map((employee) =>
        employee._id === editingEmployeeId
          ? {
              ...employee,
              name: newEmployee.name,
              address: newEmployee.address,
              designation: newEmployee.designation,
            }
          : employee
      );

      setEditingEmployeeId(null);
      setEmployees(updatedEmployees);
      setNewEmployee({ name: '', address: '', designation: '' });
      showToast('Employee edited successfully', 'success');
    } catch (error) {
      console.error(error);
      showToast('Employee edit error', 'error');
    }
  };

  return (
    <Card className='h-full w-full overflow-scroll p-8 border'>
      <div className='flex items-center mb-4'>
        <Input
          type='text'
          placeholder='Search Name or Address of the Employee'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-grow '
        />
        <div className='flex flex-col lg:flex lg:flex-row gap-2 lg:gap-0'>
          <Button
            size='sm'
            color={search ? 'gray' : 'blue-gray'}
            disabled={!search}
            onClick={handleSearch}
            className='ml-1'
          >
            Search
          </Button>
          <Button size='sm' color='gray' className='ml-2' onClick={handleClear}>
            Clear
          </Button>
        </div>
      </div>

      <table className='w-full min-w-max table-auto text-left'>
        <thead>
          <tr className='even:bg-blue-gray-50/50'>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
              >
                <Typography
                  variant='small'
                  color='blue-gray'
                  className='font-normal leading-none opacity-70'
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => {
            const isLast = index === employees.length - 1;
            const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

            return (
              <tr key={index}>
                <td className={classes}>
                  {editingEmployeeId === employee._id ? (
                    <Input
                      type='text'
                      value={newEmployee.name}
                      onChange={(e) =>
                        setNewEmployee({ ...newEmployee, name: e.target.value })
                      }
                    />
                  ) : (
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {employee.name}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingEmployeeId === employee._id ? (
                    <Input
                      type='text'
                      value={newEmployee.address}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          address: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {employee.address}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingEmployeeId === employee._id ? (
                    <Input
                      type='text'
                      value={newEmployee.designation}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          designation: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-normal'
                    >
                      {employee.designation}
                    </Typography>
                  )}
                </td>
                <td className={classes}>
                  {editingEmployeeId === employee._id ? (
                    <>
                      <Button
                        variant='outlined'
                        size='sm'
                        onClick={handleSaveEdit}
                      >
                        Save
                      </Button>
                      <Button
                        variant='outlined'
                        size='sm'
                        className='ml-1'
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant='outlined'
                        size='sm'
                        onClick={() => handleEdit(employee)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='w-6 h-6'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
                          />
                        </svg>
                      </Button>
                      <Button
                        variant='outlined'
                        size='sm'
                        className='ml-1'
                        onClick={() => handleDelete(employee._id)}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          stroke-width='1.5'
                          stroke='currentColor'
                          class='w-6 h-6'
                        >
                          <path
                            stroke-linecap='round'
                            stroke-linejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                          />
                        </svg>
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}
