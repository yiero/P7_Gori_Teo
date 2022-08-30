import React from 'react';
import '../styles/main.css';

function Main () {
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
                                <div className="title"><p>Premier topic !</p></div>
                                <div className="description"><p>Bla-bla-bla je suis très fort fort uwu regardez moi</p></div>
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