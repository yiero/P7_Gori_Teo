import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Login from './components/Login';
import Main from './components/Main';
import Profil from './components/Profil';
import Signup from './components/Signup';
import Topic from './components/Topic';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/main" element={<Main />}/>
        <Route exact path="/profil" element={<Profil />}/>
        <Route exact path="/topic" element={<Topic />}/>
        <Route exact path="/signup" element={<Signup />}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
 
