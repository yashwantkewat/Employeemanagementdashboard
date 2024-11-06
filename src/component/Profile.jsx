import React, { useEffect, useState } from 'react';
import male from "../assets/male.jpg";
import female from "../assets/female.jpg";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authenticatedUser = JSON.parse(localStorage.getItem('authenticatedUser'));
    setUser(authenticatedUser);
  }, []);

  return (
    <div className="container mt-4">
      {user ? (
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6 text-center">
            <h1 className="mb-4">Profile</h1>
            {user.gender ? (
              <img
                src={user.gender === 'male' ? male : female}
                alt={user.gender}
                className="img-fluid rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }} // Adjust size for better visibility
              />
            ) : null}
            <div className="text-start">
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Password:</strong> {user.password}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">
          <p>No user data available. Please log in.</p>
        </div>
      )}
    </div>
  );
}
