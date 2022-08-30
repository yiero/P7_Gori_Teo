import React from 'react';
import '../styles/signup.css';

function Signup () {
    return (
        <React.Fragment>
            <div className="title">
                <h1 id="title">Groupomania</h1>
            </div>
            <article>
                <label for="email">Email:</label>
                <input type="text" className="form" id="email" name="email" size="100"/>
                <label for="password">Password:</label>
                <input type="password" className="form" id="password" name="password" size="100"/>
                <label for="pseudo">Pseudo:</label>
                <input type="text" className="form" id="pseudo" name="pseudo" size="100"/>
                <label for="nom">Nom:</label>
                <input type="text" className="form" id="nom" name="nom" size="100"/>
                <label for="prenom">Prenom:</label>
                <input type="text" className="form" id="prenom" name="prenom" size="100"/>
                <button type="button" className="buttonStyled">Sign up</button>
            </article>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

export default Signup;