import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import host from '../../constants/hostName';

const Login = ({setLoggedInUserEmail}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement your login logic, like sending a request to a server
    // console.log('Email:', email);
    // console.log('Password:', password);
    const user = {email, password};
    fetch(`${host}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      // console.log('Success:', data);
      if (data.status === 'success') {
        setLoggedInUserEmail(email);
        navigate('/');
      }
    //   setResponseData(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login Page</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
