import React from 'react';
import { useState } from 'react';
import '../styles/login.css';

function Login () {
    const [email, setEmail] = useState(0)
    const [password, setPassword] = useState(0)

    // function handleSubmit(e) {
    //     e.preventDefault()
    //     console.log(email, password);
    //      const body = {
    //      email: email,
    //      password: password
    //  }
    //     // faire un fetch methode POST avec email et password
    //}

    return (
        <React.Fragment>
            <div className="title">
                <h1>Groupomania</h1>
            </div>
            <article>
                <form>
                    <label for="email">Email:</label>
                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="form" id="email" name="email" size="100" />
                    <label for="password">Password:</label>
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form" id="password" name="password" size="100" />
                    <input onClick={() => console.log(email, password)} type="submit" className="buttonStyled" value="Login"/>
                </form>
                <a href="./Signup.js" id="create">No account ? No problem, click here ! </a>
            </article>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

// écoute evenement OnChange email/password, utiliser useState pour les deux

export default Login;