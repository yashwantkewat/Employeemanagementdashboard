import React, { useEffect, useState } from 'react';

const AttendanceList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  return (
    <div className="container-fluid px-3">
      <h2 className="my-4 text-center">Employee Attendance List</h2>
      
      {/* Make table responsive */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Department</th>
              <th>Designation</th>
              <th>Attendance Date</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={index}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.number}</td>
                  <td>{employee.department}</td>
                  <td>{employee.designation}</td>
                  <td>{employee.attendanceDate || 'N/A'}</td>
                  <td>{employee.attendanceStatus || 'Absent'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center">No employees found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceList;
