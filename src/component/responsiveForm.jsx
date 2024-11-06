import React, { useState } from 'react';
import '../allcss/SlideNavbar.css';

const ResponsiveForm = ({ onAuthSuccess }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [signupData, setSignupData] = useState({ username: '', email: '', phone: '', password: '', gender: '' });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [popupMessage, setPopupMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e, setData) => setData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const validate = (email, password) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return emailRegex.test(email) && passwordRegex.test(password);
  };

  const handleSubmit = (e, type) => {
    e.preventDefault();
    let users;
    try {
      users = JSON.parse(localStorage.getItem('users')) || [];
    } catch (error) {
      console.error("Error parsing users from localStorage:", error);
      users = [];
    }

    if (type === 'signup') {
      if (!validate(signupData.email, signupData.password)) {
        return alert('Invalid email or password format!');
      }

      const userExists = users.find(user => user.email === signupData.email);
      if (userExists) {
        return alert('User already exists!');
      }

      users.push(signupData);
      localStorage.setItem('users', JSON.stringify(users));
      setPopupMessage('Sign-up successful!');
      setSignupData({ username: '', email: '', phone: '', password: '', gender: '' });
      localStorage.setItem('authenticatedUser', JSON.stringify(signupData));
      onAuthSuccess(signupData);
    } else if (type === 'login') {
      const user = users.find(user => user.email === loginData.email && user.password === loginData.password);
      if (!user) {
        return alert('Invalid email or password!');
      }

      setPopupMessage('Login successful!');
      setLoginData({ email: '', password: '' });
      localStorage.setItem('authenticatedUser', JSON.stringify(user));
      onAuthSuccess(user);
    }

    setShowPopup(true);
  };

  const handleForgetPassword = (e) => {
    e.preventDefault();
    alert("Password reset link has been sent to your email!");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" checked={isChecked} onChange={() => setIsChecked(!isChecked)} />
        <div className="signup">
          <form onSubmit={(e) => handleSubmit(e, 'signup')}>
            <label htmlFor="chk">Sign up</label>
            <input type="text" name="username" placeholder="User name" value={signupData.username} onChange={(e) => handleChange(e, setSignupData)} required />
            <input type="email" name="email" placeholder="Email" value={signupData.email} onChange={(e) => handleChange(e, setSignupData)} required />
            <input type="number" name="phone" placeholder="Phone Number" value={signupData.phone} onChange={(e) => handleChange(e, setSignupData)} required />
            <input type="password" name="password" placeholder="Password" value={signupData.password} onChange={(e) => handleChange(e, setSignupData)} required />
            
            {/* Gender selection */}
            <select name="gender" value={signupData.gender} onChange={(e) => handleChange(e, setSignupData)} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <button type="submit">Sign up</button>
          </form>
        </div>
        <div className="login">
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <label htmlFor="chk">Login</label>
            <input type="email" name="email" placeholder="Email" value={loginData.email} onChange={(e) => handleChange(e, setLoginData)} required />
            <input type="password" name="password" placeholder="Password" value={loginData.password} onChange={(e) => handleChange(e, setLoginData)} required />
            <button type="submit">Login</button><br />
            <a href='' onClick={handleForgetPassword}>Forget Password?</a>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <p>{popupMessage}</p>
            <button onClick={() => setShowPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResponsiveForm;
