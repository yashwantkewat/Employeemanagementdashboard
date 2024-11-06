import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, UserPlus, UserMinus, DollarSign, Search } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const employeeData = [
    { name: 'Jan', employees: 120 },
    { name: 'Feb', employees: 135 },
    { name: 'Mar', employees: 150 },
    { name: 'Apr', employees: 142 },
    { name: 'May', employees: 160 },
    { name: 'Jun', employees: 175 },
  ];

  const employees = [
    { id: 1, name: 'aman porwal', role: 'Software Engineer', department: 'Engineering', status: 'Active' },
    { id: 2, name: 'Jane Smith', role: 'Product Manager', department: 'sale', status: 'Active' },
    { id: 3, name: 'Mike Johnson', role: 'UI Designer', department: 'Design', status: 'On Leave' },
    { id: 4, name: 'Sarah Wilson', role: 'HR Manager', department: 'Human Resources', status: 'Active' },
    { id: 5, name: 'Tom cruise', role: 'Software Engineer', department: 'IT department', status: 'Active' },
  ];

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-4 bg-light min-vh-100">
      {/* Header */}
      <div className="mb-4 text-center">
        <h1 className="display-5 fw-bold">Employee Dashboard</h1>
        <p className="text-muted">Manage your workforce efficiently</p>
      </div>

      {/* Stats Cards */}
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 mb-4">
        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Total Employees</p>
                <h3 className="card-title">175</h3>
              </div>
              <Users className="text-primary" size={24} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">New Hires</p>
                <h3 className="card-title">12</h3>
              </div>
              <UserPlus className="text-success" size={24} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Resignations</p>
                <h3 className="card-title">4</h3>
              </div>
              <UserMinus className="text-danger" size={24} />
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card shadow-sm">
            <div className="card-body d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Average Salary</p>
                <h3 className="card-title">$75,000</h3>
              </div>
              <DollarSign className="text-warning" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h5">Employee Growth</h2>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={employeeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="employees" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="h5">Employee List</h2>
          <div className="input-group" style={{ maxWidth: '300px' }}>
            <span className="input-group-text">
              <Search size={16} />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead className="table-light">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.role}</td>
                  <td>{employee.department}</td>
                  <td>
                    <span className={`badge ${employee.status === 'Active' ? 'bg-success' : 'bg-warning'} text-white`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
