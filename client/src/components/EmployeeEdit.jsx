import React, { useState } from 'react';
import axios from 'axios';

const EmployeeEdit = ({ employee, onEdit, onCancel }) => {
  const [editedName, setEditedName] = useState(employee.name);
  const [editedAddress, setEditedAddress] = useState(employee.address);

  const handleEdit = async () => {
    try {
      const response = await axios.put(`http://localhost:3001/employees/${employee._id}`, {
        name: editedName,
        address: editedAddress,
      });
      onEdit(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
      <input type="text" value={editedAddress} onChange={(e) => setEditedAddress(e.target.value)} />
      <button onClick={handleEdit}>Save</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default EmployeeEdit;
