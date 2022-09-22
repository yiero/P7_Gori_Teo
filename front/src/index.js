import React from 'react';
import ReactDOM from 'react-dom/client';
import { Router, Route } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import Login from './components/Login';
import Main from './components/Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <Router>
      <Route path="/">
        <Login />
      </Route>
      {/* <Route path="/api/topic">
        <Main />
      </Route> */}
    </Router>
  </React.StrictMode>
)

