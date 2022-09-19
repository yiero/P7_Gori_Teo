import React from 'react';
import { useState } from 'react';
import '../styles/login.css';

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: email,
            password: password
        }
        console.log(body);
    
        fetch("http://localhost:3000/api/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } 
            else {
                return res.status;
            }
        })
        .then(function(value) {
            console.log(value.token);
            localStorage.setItem('token', value.token);
        })
    }

    return (
        <React.Fragment>
            <div className="title">
                <h1>Groupomania</h1>
            </div>
            <article>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form" id="email" name="email" size="100" />
                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form" id="password" name="password" size="100" />
                    <input type="submit" className="buttonStyled" value="Login"/>
                </form>
                <a href="./Signup.js" id="create">No account ? click here ! </a>
            </article>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}


export default Login;