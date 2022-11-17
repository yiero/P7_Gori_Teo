import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import Login from './components/Login';
import Main from './components/Main';
import Profil from './components/Profil';
import Signup from './components/Signup';
import Topic from './components/Topic';
import Header from './components/Header';
import Footer from './components/Footer'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      {false && <Header />}
      <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/main" element={<Main />}/>
          <Route exact path="/profil/:id" element={<Profil />}/>
          <Route exact path="/topic/:id" element={<Topic />}/>
          <Route exact path="/signup" element={<Signup />}/>
      </Routes>
      <Footer />
    </Router>
  </React.StrictMode>
)
 
