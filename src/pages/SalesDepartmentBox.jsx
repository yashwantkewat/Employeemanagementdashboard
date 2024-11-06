import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const SalesDepartmentBox = () => {
  const [employees, setEmployees] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editedEmployee, setEditedEmployee] = useState({
    name: '',
    email: '',
    number: '',
    designation: '',
    department: ''
  });

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const saveToLocalStorage = (updatedEmployees) => {
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  const handleDeleteEmployee = async (index) => {
    const confirmDelete = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to recover this employee!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    });

    if (confirmDelete.isConfirmed) {
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      saveToLocalStorage(updatedEmployees);
      await Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
    }
  };

  const handleEditClick = (employee, index) => {
    setIsEditing(index);
    setEditedEmployee(employee);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const updatedEmployees = employees.map((emp, index) =>
      index === isEditing ? { ...emp, ...editedEmployee } : emp
    );
    setEmployees(updatedEmployees);
    saveToLocalStorage(updatedEmployees);
    setIsEditing(null);
    await Swal.fire('Success', 'Employee updated successfully!', 'success');
  };

  const salesEmployees = employees.filter(emp => emp.department === 'Sales');

  return (
    <div className="department-box container my-4 d-flex flex-column align-items-center">
      <h2 className="text-center mb-4">Sales Department</h2>
      {isEditing !== null ? (
        <form onSubmit={handleEditSubmit} className="mb-3" style={{
          background: 'linear-gradient(to right, rgba(255, 255, 255, 0.33) 43%, rgba(255, 165, 0, 0.33) 33%, rgba(38, 143, 255, 0.34) 34%)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          padding: '20px',
          width: '100%',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <h3 className="text-center">Edit Employee</h3>
          <div className="row">
            <div className="col-12 col-md-6 mb-3">
              <input
                type="text"
                value={editedEmployee.name}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, name: e.target.value })}
                placeholder="Name"
                required
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                type="email"
                value={editedEmployee.email}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
                placeholder="Email"
                required
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                type="text"
                value={editedEmployee.number}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, number: e.target.value })}
                placeholder="Number"
                required
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                type="text"
                value={editedEmployee.designation}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, designation: e.target.value })}
                placeholder="Designation"
                required
                className="form-control"
              />
            </div>
            <div className="col-12 mb-3">
              <select
                value={editedEmployee.department}
                onChange={(e) => setEditedEmployee({ ...editedEmployee, department: e.target.value })}
                required
                className="form-select"
              >
                <option value="">Select Department</option>
                <option value="HR">HR</option>
                <option value="Sales">Sales</option>
                <option value="IT">IT</option>
                <option value="Management">Management</option>
              </select>
            </div>
            <div className="col-12 d-flex justify-content-between">
              <button type="submit" className="btn btn-success btn-sm">Save</button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setIsEditing(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      ) : (
        <ul className="list-group">
          {salesEmployees.map((employee, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              {employee.name} - {employee.designation} - {employee.number} - {employee.department} - {employee.email}
              <div>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEditClick(employee, index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteEmployee(index)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SalesDepartmentBox;
