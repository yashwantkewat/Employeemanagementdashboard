import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import ResponsiveForm from './component/responsiveForm';
import Home from './component/Home'; 
import Navbar from './component/Navbar';
import AddEmployeeForm from './component/AddEmployee';
import HRDepartmentBox from './pages/HRDepartmentBox';
import SalesDepartmentBox from './pages/SalesDepartmentBox';
import ITDepartmentBox from './pages/ITDepartmentBox';
import ManagmentDepartment from './pages/ ManagementBox';

   ////  this is your navbar component ///
import EmployeeList from './pages/EmployeeList'; 
import Profile from './component/Profile';
import AttendanceList from './component/AttendanceList';
import EMPPerformance from './component/PerformanceManagement';
import HelpCenter from './component/HelpCenter';
import EmployeeFeedback from './component/EmployeeFeedback';
import PaymentOptions from './component/PaymentOptions';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const user = localStorage.getItem('authenticatedUser');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthentication = (status) => {
    setIsAuthenticated(status);
    if (!status) {
      localStorage.removeItem('authenticatedUser');
    }
  };

  const handleAddEmployee = (newEmployee) => {
    setEmployees([...employees, newEmployee]);
  };

  const handleUpdateEmployees = (updatedEmployees) => {
    setEmployees(updatedEmployees);
  };

  return (
    <Router>
      <div className='app'>
        {!isAuthenticated ? (
          <ResponsiveForm onAuthSuccess={() => handleAuthentication(true)} />
        ) : (
          <>
            <Navbar onLogout={() => handleAuthentication(false)} />
            <div className="content-wrapper">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employee-list" element={<EmployeeList employees={employees} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/hr-department" element={<HRDepartmentBox employees={employees} onUpdate={handleUpdateEmployees} />} />
                <Route path="/sales-department" element={<SalesDepartmentBox employees={employees} onUpdate={handleUpdateEmployees} />} />
                <Route path="/it-department" element={<ITDepartmentBox employees={employees} onUpdate={handleUpdateEmployees} />} />
                <Route path="/management-department" element={<ManagmentDepartment employees={employees} onUpdate={handleUpdateEmployees} />} />
                <Route path="/add-employee" element={<AddEmployeeForm onAddEmployee={handleAddEmployee} />} />
                <Route path="/attendance" element={<AttendanceList/>} />
                <Route path="/performance" element={<EMPPerformance/>} />
                <Route path="/help-center" element={<HelpCenter/>} />
                <Route path="/feedback" element={<EmployeeFeedback/>} />
                <Route path="/payments" element={<PaymentOptions/>} />

              </Routes>
            </div>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
