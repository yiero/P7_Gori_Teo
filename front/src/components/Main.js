import React from 'react';
import { useState, useEffect } from 'react'
import '../styles/main.css';

function Main () {
    const [ title, updateTitle ] = useState("")
    const [ description, updateDescription ] = useState("")

    //à la fin, remplacer variable token dur => localStorage getItem (token)
    useEffect(() => {
        let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY2MzU5MTY3MywiZXhwIjoxNjYzNjc4MDczfQ.NSIYlq19wutTuQq34zIcmoEOz2EwZzMIDKAhUb9v17o"
        fetch ("http://localhost:3000/api/topic", {
        method: "GET",
        headers: { 
            'Authorization': "BEARER " + token
        }
    })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            updateTitle(value[0].title);
            updateDescription(value[0].description)
        })
    })

    // double fetch possible ? Pour récupérer le pseudo et afficher dans "author" 
    // then(function(user) => user.pseudo)
    return (
        <React.Fragment>
            <header>
                <div id="header">
                    <div id="title">
                        <h1>Groupomania</h1>
                    </div>
                    <div id="profil">
                        <a href="./Profil.js"><button id="buttonProfil" type="button">Profil</button></a>
                    </div>
                </div>
            </header>
            <main>
                <div id="topics">
                    <div className="topic"> 
                        <div className="topicStyle">   
                            <div className="topicType">
                                <div className="title"><p>{title}</p></div>
                                <div className="description"><p>{description}</p></div>
                                <div className="response"><p>0 réponses</p></div>
                            </div>
                            <div className="interactTopic">
                                <div className="like"><p>👍</p></div>
                                <div className="dislike"><p>👎</p></div>
                                <div className="author"><p>MWA</p></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

export default Main;