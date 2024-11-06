import React from 'react';
import '../allcss/Home.css';
import { Link } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

export default function Home() {
  return (
    <>
     <div className="container">
      <Link to="/hr-department" className="department-link">HR Department</Link>
      <Link to="/sales-department" className="department-link">Sales Department</Link>
      <Link to="/it-department" className="department-link">IT Department</Link>
      <Link to="/management-department" className="department-link">Management Department</Link>
    </div>
    <Dashboard/>
    </>
   
  );
}
