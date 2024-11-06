import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, UserPlus, User, Home, List, CheckCircle, BarChart2, FileText, Smile, HelpCircle, CreditCard, LogOut 
} from 'lucide-react'; // Import icons

function Navbar({ user, onLogout }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authenticatedUser');
    onLogout(false);
    navigate('/');
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-left">
          <button className="toggle-button" onClick={toggleSidebar} aria-label="Toggle sidebar">
            <Menu className="icon" />
          </button>
        </div>
        <h1>Employee Management Dashboard</h1>
        <div className="navbar-right">
          {user ? (
            <div className="user-info">
              <User className="icon" />
              <span>{user.username || user.email}</span>
              <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/add-employee" className="add-employee-button">
               Add Employee
            </Link>
          )}
        </div>
      </nav>

      {/* Sidebar content directly in the Navbar component */}
      <div className={`sidebar ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <ul className="sidebar-list">
          <li className="sidebar-item">
            <Link to="/" className="sidebar-link">
              <Home className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Home</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/employee-list" className="sidebar-link">
              <List className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Add Employee</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/profile" className="sidebar-link">
              <User className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Profile</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/attendance" className="sidebar-link">
              <CheckCircle className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Attendance Tracking</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/performance" className="sidebar-link">
              <BarChart2 className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>EMPloyee Performance </span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/feedback" className="sidebar-link">
              <Smile className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Employee feedback</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/help-center" className="sidebar-link">
              <HelpCircle className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Help Center</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/payments" className="sidebar-link">
              <CreditCard className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>Payment Option</span>
            </Link>
          </li>
          <li className="sidebar-item">
            <button className="sidebar-link" onClick={handleLogout}>
              <LogOut className="icon" />
              <span className={`sidebar-text ${isSidebarOpen ? 'show' : 'hide'}`}>LogOut</span>
            </button>
          </li>
        </ul>
      </div>

      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Navbar;
