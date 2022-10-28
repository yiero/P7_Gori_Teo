import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/login.css';
import { useNavigate } from "react-router-dom";

function Login () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

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
            localStorage.setItem('token', value.token);
            localStorage.setItem('userId', value.userId);
            navigate("/main");
        })
    }


    return (
        <React.Fragment>
            <div className="title">
                <Link to="/" style={{ textDecoration: 'none' }}><h1>Groupomania</h1></Link>
            </div>
            <article>
                <form id="formLoginSignup" onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form" id="email" name="email" size="100" required/>
                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form" id="password" name="password" size="100" required/>
                    <input type="submit" className="buttonStyled" value="Login"/>
                </form>
                <Link to="/signup" id="create">No account ? click here !</Link>
            </article>
        </React.Fragment>
    )
}


export default Login;