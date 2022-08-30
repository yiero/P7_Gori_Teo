import React from 'react';
import '../styles/login.css';

function Login () {
    return (
        <React.Fragment>
            <div className="title">
                <h1>Groupomania</h1>
            </div>
            <article>
                <label for="email">Email:</label>
                <input type="text" className="form" id="email" name="email" size="100" />
                <label for="password">Password:</label>
                <input type="password" className="form" id="password" name="password" size="100" />
                <button type="button" className="buttonStyled">Login</button>
                <a href="./Signup.js" id="create">No account ? No problem, click here ! </a>
            </article>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

export default Login;