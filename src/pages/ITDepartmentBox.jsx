import React, { useState, useEffect } from 'react';

const ITDepartmentBox = () => {
  const [employees, setEmployees] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editEmployee, setEditEmployee] = useState({
    name: '',
    position: '',
    department: 'IT',
  });

  // Load employees from local storage
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Save employees to local storage
  const saveToLocalStorage = (updatedEmployees) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleEditClick = (index, employee) => {
    setEditIndex(index);
    setEditEmployee({ ...employee });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditEmployee({ ...editEmployee, [name]: value });
  };

  const handleUpdateEmployee = (e) => {
    e.preventDefault();
    const updatedEmployees = [...employees];
    updatedEmployees[editIndex] = editEmployee;
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
    setEditIndex(null);
  };

  const handleDeleteEmployee = (index) => {
    const updatedEmployees = employees.filter((_, i) => i !== index);
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
  };

  // Filter IT employees
  const itEmployees = employees.filter(emp => emp.department === 'IT');

  return (
    <div className="department-box container my-4">
      <h2 className="text-center mb-4">IT Department</h2>
      <ul className="list-group">
        {itEmployees.map((employee, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            {employee.name} - {employee.position} - {employee.department} - {employee.email}
            <div>
              <button className="btn btn-warning btn-sm" onClick={() => handleEditClick(index, employee)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEmployee(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>

      {/* Edit Form */}
      {editIndex !== null && (
        <form onSubmit={handleUpdateEmployee} className="mt-4" style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.33) 33%, rgba(255, 165, 0, 0.33) 33%, rgba(38, 143, 255, 0.34) 34%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h3 className="text-center">Edit Employee</h3>
          <div className="mb-3">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editEmployee.name}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Position:</label>
            <input
              type="text"
              name="position"
              value={editEmployee.position}
              onChange={handleChange}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Department:</label>
            <select
              name="department"
              value={editEmployee.department}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="HR">HR</option>
              <option value="IT">IT</option>
              <option value="Sales">Sales</option>
              <option value="Management">Management</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success">Save</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditIndex(null)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default ITDepartmentBox;
