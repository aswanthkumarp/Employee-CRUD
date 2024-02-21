const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  address: String,
  designation: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
