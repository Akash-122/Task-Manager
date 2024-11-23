import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling
import host from '../../constants/hostName';

const SignUp = ({setLoggedInUserEmail}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  
  function checkWhitespace(str) {    
    
    const spacepattern   /\s/
    .test(str);

  }
   
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Here you can implement your sign-up logic, like sending a request to a server
    // console.log('Name:', name);
    // console.log('Email:', email);
    // console.log('Password:', password);
    const user = {name, email, password};
    fetch(`${host}/users/add-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    //   setResponseData(data);
    setLoggedInUserEmail(email);
    navigate('/');
    })
    .catch(error => {
      console.error('Error:', error);
    });
    // const userData =  await data.text();
    // console.log('data', userData);
    
  };

  return (
    <div className="login-container"> {/* Use the same container style as the Login page */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up Page</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
