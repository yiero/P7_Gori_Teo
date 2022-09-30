import React from 'react';
import { useState } from 'react';
import '../styles/signup.css';
import { Link } from 'react-router-dom';

function Signup () {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pseudo, setPseudo] = useState("")
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        const body = {
            email: email,
            password: password,
            pseudo: pseudo,
            nom: nom,
            prenom: prenom
        }

        fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                return res.status;
            }
        })
        .then(function(value) {
            console.log(value);
            window.location.href = window.location.protocol + "//" + window.location.host + '/';
        })
    }

    return (
        <React.Fragment>
            <div className="title">
                <Link to="/" style={{ textDecoration: 'none' }}><h1>Groupomania</h1></Link>
            </div>
            <article>
                <form onSubmit={handleSubmit}>
                    <label>Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)}type="email" className="form" id="email" name="email" size="100" required/>
                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)}type="password" className="form" id="password" name="password" size="100" required/>
                    <label>Pseudo:</label>
                    <input onChange={(e) => setPseudo(e.target.value)}type="text" className="form" id="pseudo" name="pseudo" size="100" required/>
                    <label>Nom:</label>
                    <input onChange={(e) => setNom(e.target.value)}type="text" className="form" id="nom" name="nom" size="100" required/>
                    <label>Prenom:</label>
                    <input onChange={(e) => setPrenom(e.target.value)}type="text" className="form" id="prenom" name="prenom" size="100" required/>
                    <input onClick={() => console.log(email,password,pseudo,nom,prenom)} type="submit" className="buttonStyled" value="Signup"/>
                </form>
            </article>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

export default Signup;