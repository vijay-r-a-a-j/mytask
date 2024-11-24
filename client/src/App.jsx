import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CreateEmployee from './components/Dashboard/CreateEmployee';
import Employeelist from './components/Dashboard/Employeelist';
import Navbar from './components/Dashboard/Navbar';

export default function App() {
 
  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/employeelist" element={<Employeelist/>}/>
        <Route path="/createemployee" element={<CreateEmployee/>}/>
      </Routes>
    </Router>
  );
}
