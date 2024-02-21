const Employee = require('../model/Employee');
const express = require('express');

const router = express.Router();

router.get('/getEmployees', async (req, res) => {
  try {
    const { name, address } = req.query;

    const nameRegex = new RegExp(name, 'i');
    const addressRegex = new RegExp(address, 'i');

    const query = {
      $or: [
        { name: { $regex: nameRegex } },
        { address: { $regex: addressRegex } },
      ],
    };

    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/employees', async (req, res) => {
  const { name, address, designation } = req.body;
  const employee = new Employee({ name, address, designation });

  try {
    const savedEmployee = await employee.save();
    res.json(savedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { id } = req.params;
  const { name, address, designation } = req.body;

  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { name, address, designation },
      { new: true }
    );
    res.json(updatedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/employees/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);
    res.json(deletedEmployee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
