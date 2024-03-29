import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';
import Header from './Header'

function Main () {

    const [ topics, updateTopics ] = useState([]);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ file, setFile ] = useState(null)

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
    }, [])


    function handleSubmit(e) {
        e.preventDefault()
        let token = localStorage.getItem('token');
        
        const formData = new FormData();
        formData.append("title", title);
        formData.append("description", description);
        formData.append("image", file);

        fetch("http://localhost:3000/api/topic", {
            method: "POST",
            headers: {
                'Authorization': "BEARER " + token
            },
            body: formData
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                return res.status;
            }
        })
        alert("Votre topic a été créé")
    }

    function refreshPages() {
        window.location.reload();
    }


    return (
        <React.Fragment>
            <Header/>
            <main>
                <div onClick={refreshPages} id="refresh">
                    <input type="button" value="Actualiser" id="refreshButton"/>
                </div>
                <div id="topics">
                    {topics.map((value, index) =>(
                            <div className="topic"> 
                                <div className="topicStyle"> 
                                    <Link to={"/topic" + "/" + value.id} style={{ textDecoration: 'none' }}>  
                                        <div className="topicType">
                                            <div className="title"><p key={`${value}-${index}`}>{value.title}</p></div>
                                            <div className="description"><p key={`${value}-${index}`}>{value.description}</p></div>
                                            <div className="response"><p key={`${value}-${index}`}>{value.comments.length} réponse(s)</p></div>
                                        </div>
                                    </Link>
                                    <div className="interactTopic">
                                        <div className="like"><p>👍 {value.likes.length}</p></div>
                                        <div className="author"><Link to={"/profil/" + value.userId} id="linkProfil" key={`${value}-${index}`}>{value.user.pseudo}</Link></div>
                                    </div>
                                </div>
                            </div>
                    )).reverse()}
                </div>
                <div id="create_topic"><h3>Rejoins nous en créant ton topic !</h3></div>
                <div id="form">
                    <form id="formLoginSignup" onSubmit={handleSubmit} className="newTopic">
                        <input onChange={(e) => setTitle(e.target.value)} type="text" name="titre" id="title_topic" placeholder="Saisissez votre titre" required></input>
                        <textarea onChange={(e) => setDescription(e.target.value)} type="text" name="description" id="description_topic" placeholder="Entrez votre message" cols="30" rows="5" required></textarea>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} required></input>
                        <input type="submit" value="Créer" className="buttonProfilCreate"></input>
                    </form>        
                </div>
            </main>
        </React.Fragment>
    )
}

export default Main;