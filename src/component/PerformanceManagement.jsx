import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const EmpPerformance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [performanceData, setPerformanceData] = useState({
    projectsCompleted: '',
    taskEfficiency: '',
    teamwork: '',
    attendanceRating: '',
  });
  const [showChart, setShowChart] = useState(false);
  const navigate = useNavigate();

  // Fetch employee data from local storage when component mounts
  useEffect(() => {
    const storedEmployees = JSON.parse(localStorage.getItem('employees')) || [];
    setEmployees(storedEmployees);
  }, []);

  // Handle employee selection
  const handleEmployeeSelect = (e) => {
    const employee = employees.find(emp => emp.email === e.target.value);
    setSelectedEmployee(employee);

    // Check if performance data exists in localStorage for the selected employee
    const storedPerformanceData = JSON.parse(localStorage.getItem(`performance-${employee.email}`)) || {};
    setPerformanceData(storedPerformanceData);
  };

  // Handle form submission to store employee performance
  const handlePerformanceSubmit = (e) => {
    e.preventDefault();

    if (!selectedEmployee) {
      Swal.fire('Error', 'Please select an employee.', 'error');
      return;
    }

    // Save performance data to localStorage
    localStorage.setItem(`performance-${selectedEmployee.email}`, JSON.stringify(performanceData));

    Swal.fire('Success', 'Performance data updated successfully!', 'success');
    
    // Show doughnut chart after submission
    setShowChart(true);
  };

  // Calculate total performance score
  const calculateTotalPerformance = () => {
    return (
      parseInt(performanceData.projectsCompleted) +
      parseInt(performanceData.taskEfficiency) +
      parseInt(performanceData.teamwork) +
      parseInt(performanceData.attendanceRating)
    ) || 0;
  };

  const totalPerformance = calculateTotalPerformance();

  // Calculate percentages for display
  const calculatePercentages = () => {
    return {
      projectsCompleted: (parseInt(performanceData.projectsCompleted) / totalPerformance) * 100 || 0,
      taskEfficiency: (parseInt(performanceData.taskEfficiency) / totalPerformance) * 100 || 0,
      teamwork: (parseInt(performanceData.teamwork) / totalPerformance) * 100 || 0,
      attendanceRating: (parseInt(performanceData.attendanceRating) / totalPerformance) * 100 || 0,
    };
  };

  const percentages = calculatePercentages();

  // Calculate doughnut chart segments based on performance metrics
  const calculateChartSegments = () => {
    return {
      projectsCompleted: (parseInt(performanceData.projectsCompleted) / totalPerformance) * 360 || 0,
      taskEfficiency: (parseInt(performanceData.taskEfficiency) / totalPerformance) * 360 || 0,
      teamwork: (parseInt(performanceData.teamwork) / totalPerformance) * 360 || 0,
      attendanceRating: (parseInt(performanceData.attendanceRating) / totalPerformance) * 360 || 0,
    };
  };

  const chartSegments = calculateChartSegments();

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh',paddingTop:"20px" }}>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        <h2 className="text-center mb-4">Employee Performance Management</h2>
        
        <form onSubmit={handlePerformanceSubmit} style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <div className="form-group mb-3">
            <label>Select Employee</label>
            <select 
              className="form-control" 
              onChange={handleEmployeeSelect}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((employee) => (
                <option key={employee.email} value={employee.email}>
                  {employee.name} - {employee.email}
                </option>
              ))}
            </select>
          </div>

          {selectedEmployee && (
            <>
              <div className="form-group mb-3">
                <label>Projects Completed</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={performanceData.projectsCompleted}
                  onChange={(e) => setPerformanceData({ ...performanceData, projectsCompleted: e.target.value })}
                  placeholder="Enter the number of projects completed"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Task Efficiency (%)</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={performanceData.taskEfficiency}
                  onChange={(e) => setPerformanceData({ ...performanceData, taskEfficiency: e.target.value })}
                  placeholder="Enter task efficiency percentage"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Teamwork (Rating 1-5)</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={performanceData.teamwork}
                  onChange={(e) => setPerformanceData({ ...performanceData, teamwork: e.target.value })}
                  placeholder="Rate teamwork (1-5)"
                  min="1"
                  max="5"
                  required
                />
              </div>

              <div className="form-group mb-3">
                <label>Attendance Rating (Rating 1-5)</label>
                <input 
                  type="number" 
                  className="form-control"
                  value={performanceData.attendanceRating}
                  onChange={(e) => setPerformanceData({ ...performanceData, attendanceRating: e.target.value })}
                  placeholder="Rate attendance (1-5)"
                  min="1"
                  max="5"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary">Submit Performance</button>
            </>
          )}
        </form>

        {showChart && (
          <div className="mt-5 text-center">
            <h4>Performance Doughnut Chart</h4>
            <div 
              style={{
                width: '200px',
                height: '200px',
                borderRadius: '50%',
                position: 'relative',
                margin: '0 auto'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: `conic-gradient(
                    #4caf50 ${chartSegments.projectsCompleted}deg, 
                    #2196f3 ${chartSegments.projectsCompleted}deg ${chartSegments.projectsCompleted + chartSegments.taskEfficiency}deg, 
                    #ff9800 ${chartSegments.projectsCompleted + chartSegments.taskEfficiency}deg ${chartSegments.projectsCompleted + chartSegments.taskEfficiency + chartSegments.teamwork}deg, 
                    #f44336 ${chartSegments.projectsCompleted + chartSegments.taskEfficiency + chartSegments.teamwork}deg)`
                }}
              />
              <div 
                style={{
                  width: '80%',
                  height: '80%',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '10%',
                  left: '10%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.2em',
                  fontWeight: 'bold',
                }}
              >
                Total: {totalPerformance}
              </div>
            </div>

            {/* Display performance metrics outside the doughnut chart */}
            <div className="mt-4">
              <p><strong>Projects Completed:</strong> {percentages.projectsCompleted.toFixed(2)}%</p>
              <p><strong>Task Efficiency:</strong> {percentages.taskEfficiency.toFixed(2)}%</p>
              <p><strong>Teamwork:</strong> {percentages.teamwork.toFixed(2)}%</p>
              <p><strong>Attendance Rating:</strong> {percentages.attendanceRating.toFixed(2)}%</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmpPerformance;
