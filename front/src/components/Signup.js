import React from 'react';
import { useState } from 'react';
import '../styles/signup.css';

function Signup () {
    const [email, setEmail] = useState(0)
    const [password, setPassword] = useState(0)
    const [pseudo, setPseudo] = useState(0)
    const [nom, setNom] = useState(0)
    const [prenom, setPrenom] = useState(0)

    return (
        <React.Fragment>
            <div className="title">
                <h1 id="title">Groupomania</h1>
            </div>
            <article>
                <form>
                    <label>Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)}type="text" className="form" id="email" name="email" size="100"/>
                    <label>Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)}type="password" className="form" id="password" name="password" size="100"/>
                    <label>Pseudo:</label>
                    <input onChange={(e) => setPseudo(e.target.value)}type="text" className="form" id="pseudo" name="pseudo" size="100"/>
                    <label>Nom:</label>
                    <input onChange={(e) => setNom(e.target.value)}type="text" className="form" id="nom" name="nom" size="100"/>
                    <label>Prenom:</label>
                    <input onChange={(e) => setPrenom(e.target.value)}type="text" className="form" id="prenom" name="prenom" size="100"/>
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