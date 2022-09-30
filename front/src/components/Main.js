import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

function Main () {
    const [ topics, updateTopics ] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
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
                updateTopics(value);
            })
    })
 
    return (
        <React.Fragment>
            <header>
                <div id="header">
                    <div id="title">
                        <Link to ="/" style={{ textDecoration: 'none' }}><h1>Groupomania</h1></Link>
                    </div>
                    <div className='nav'>
                        <Link to="/profil"><button className="buttonProfil" type="button">Profil</button></Link>
                    </div>
                    <div className='nav'>
                        <Link to ="/"><button className="buttonProfil" type="button">Deconnexion</button></Link>
                    </div>
                </div>
            </header>
            <main>
                <div id="topics">
                    {topics.map((value, index) =>(
                        <div className="topic"> 
                            <div className="topicStyle">   
                                <div className="topicType">
                                    <div className="title"><p key={`${value}-${index}`}>{value.title}</p></div>
                                    <div className="description"><p key={`${value}-${index}`}>{value.description}</p></div>
                                    <div className="response"><p key={`${value}-${index}`}>{value.comments.length} réponse(s)</p></div>
                                </div>
                                <div className="interactTopic">
                                    <div className="like"><p>👍 {value.likes.length}</p></div>
                                    {/* <div className="dislike"><p>👎</p></div> */}
                                    <div className="author"><p key={`${value}-${index}`}>{value.user.pseudo}</p></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
            <footer>
                <div>Created by Téo Gori</div>
            </footer>
        </React.Fragment>
    )
}

export default Main;