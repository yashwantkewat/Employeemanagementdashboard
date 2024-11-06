import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../allcss/AddEmployee.css"

const AddEmployeeForm = ({ onAddEmployee }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [attendanceDate, setAttendanceDate] = useState('');
  const [attendanceStatus, setAttendanceStatus] = useState('');
  
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
  };

  const validateName = (name) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const validateNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateName(name)) {
      return Swal.fire('Error', 'Name should contain only letters.', 'error');
    }

    if (!validateEmail(email)) {
      return Swal.fire('Error', 'Email must be a valid Gmail address.', 'error');
    }

    if (!validateNumber(number)) {
      return Swal.fire('Error', 'Number must be exactly 10 digits and contain only numbers.', 'error');
    }

    const newEmployee = { 
      name, 
      email, 
      number, 
      department, 
      designation, 
      attendanceDate, 
      attendanceStatus 
    };
    
    // Store the new employee with attendance in local storage
    const existingEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    existingEmployees.push(newEmployee);
    localStorage.setItem('employees', JSON.stringify(existingEmployees));

    onAddEmployee(newEmployee); // Add new employee to the list

    await Swal.fire('Success', 'Employee and attendance recorded successfully!', 'success');
    navigate(`/${department.toLowerCase()}-department`);
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="form-container">
      <form className="add-employee-form" onSubmit={handleSubmit}>
        <h2 className="mb-4 text-center">Add Employee & Attendance</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="text"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          placeholder="10-Digit Number"
          required
        />
        <div className="form-group mb-3">
          <select
            id="departmentSelect"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="form-control"
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Sales">Sales</option>
            <option value="IT">IT</option>
            <option value="Management">Management</option>
          </select>
        </div>
        <input
          type="text"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
          placeholder="Designation"
          required
        />
        <input
          type="date"
          value={attendanceDate}
          onChange={(e) => setAttendanceDate(e.target.value)}
          placeholder="Attendance Date"
          required
        />
        <div className="form-group mb-3">
          <select
            id="attendanceStatusSelect"
            value={attendanceStatus}
            onChange={(e) => setAttendanceStatus(e.target.value)}
            required
            className="form-control"
          >
            <option value="">Select Attendance Status</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <div className="d-flex justify-content-between mt-4">
          <button type="submit" className="btn btn-primary">Add Employee</button>
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
