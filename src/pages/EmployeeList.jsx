import React, { useState, useEffect } from 'react';
import HRDepartmentBox from './HRDepartmentBox';
import ITDepartmentBox from './ITDepartmentBox';
import SalesDepartmentBox from './SalesDepartmentBox';
import ManagmentDepartment from './ ManagementBox';
import AddEmployeeForm from '../component/AddEmployee';
const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  const handleAddEmployee = (newEmployee) => {
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
  };

  return (
    <div>
      <AddEmployeeForm onAddEmployee={handleAddEmployee} />
      <HRDepartmentBox employees={employees.filter(emp => emp.department === 'HR')} onUpdate={setEmployees} />
      <ITDepartmentBox employees={employees.filter(emp => emp.department === 'IT')} onUpdate={setEmployees} />
      <SalesDepartmentBox employees={employees.filter(emp => emp.department === 'Sales')} onUpdate={setEmployees} />
      <ManagmentDepartment employees={employees.filter(emp => emp.department === 'Management')} onUpdate={setEmployees} />

    </div>
  );
};

export default EmployeeManagement;
