import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import Login from './components/Login';
import Main from './components/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}/>
        <Route exact path="/main" element={<Main />}/>
      </Routes>
    </Router>
  </React.StrictMode>
)
 
