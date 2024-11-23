import React, { useState } from 'react';
import { HashRouter ,Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import Item from './Components/Item';
import Navbar from './Components/Navbar';
import CreateItem from './Components/CreateItem';
import TODOItems from './Components/TODOItems';
import Login from './Components/Login';
import Home from './Components/Home';
import SignUp from './Components/SignUp';
// import TODOItem from './Components/TODOItems';

export default function App() {

  const [loggedInUserEmail, setLoggedInUserEmail] = useState('');

  return (
    <div>
    <HashRouter basename='/' >
      <Navbar loggedInUserEmail={loggedInUserEmail} setLoggedInUserEmail={setLoggedInUserEmail}/>
      {/*   setLoggedInUserEmail={setLoggedInUserEmail} */}
      <Routes>
        <Route exact path='/' element={<Home loggedInUserEmail={loggedInUserEmail}/>}/>
        <Route path='/login' element={<Login setLoggedInUserEmail={setLoggedInUserEmail}/>} />
        <Route path='/signup' element={<SignUp setLoggedInUserEmail={setLoggedInUserEmail}/>} />
      </Routes>
    </HashRouter>
    </div>
  );
}
