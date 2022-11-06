import React, { useEffect, useState } from 'react';
import '../styles/topic.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from "react-router-dom";

function Topic () {

    const { id } = useParams();
    let token = localStorage.getItem('token');
    const navigate = useNavigate();
    const [ topic, setTopic ] = useState("");
    const [ isEditing, setEditing ] = useState(false);
    const [ showComments, setShowComments ] = useState(false);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");

    function edit () {
        setEditing(!isEditing);
    }

    useEffect(() => {
        fetch ("http://localhost:3000/api/topic/" + id, {
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
                setTopic(value); 
                setTitle(value.title);
                setDescription(value.description);
                console.log(value) 
            })
    }, []) 

    function handleSubmit (e) {
        e.preventDefault()
        const body = {
            title: title,
            description: description
        }

        fetch("http://localhost:3000/api/topic/" + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "BEARER " + token
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
        // window.location.reload();
    }
    
    function deleteTopic () {
        fetch("http://localhost:3000/api/topic/" + id, {
            method: "DELETE",
            headers: {
                'Authorization': "BEARER " + token
            }
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        navigate("/main");
    }

    function comments (i) {
        setShowComments(!showComments);
        // for (let i = 0; i < topic.comments.length; i++) {
            // console.log(topic.comments[1]); 
        // }  
    }

    const createDate = new Date(topic.createdAt).toLocaleDateString("fr");
    const updateDate = new Date(topic.updatedAt).toLocaleDateString("fr");

    
    

    return (
        <React.Fragment>
           <Header />
           <main id="main">
                <div id="interactButton">
                    <button onClick={(edit)}className="interact">✏</button>
                    <button onClick={(deleteTopic)}className="interact">❌</button>
                </div>
                    <form onSubmit={handleSubmit}>
                        { !isEditing && <h2 id="topicTitle">{topic.title}</h2> }
                        { isEditing && <div id="inputTitleFlex"><input onChange={(e) => setTitle(e.target.value)} id="inputTitle" type="text" placeholder="Modifiez le titre" value={title}></input></div>}
                        <div id="pseudoDescription">
                            { !isEditing && <div id="topicDescription">{topic.description}</div>}
                            { isEditing && <input onChange={(e) => setDescription(e.target.value)} id="inputDescription" type="text" placeholder="Modifiez le texte" value={description}></input>}
                            { topic.user && <div id="pseudoTopic">{topic.user.pseudo}</div> }
                        </div>
                        { isEditing && <div id="submitModification"><input type="submit" className="buttonProfilCreate" value="Modifier"></input></div>}
                        <div className="updateTopics">Crée le {createDate}</div>
                        <div className="updateTopics">Mis à jour le {updateDate}</div>
                    </form>
                <div id="interaction">
                    { topic.likes && <button className="buttonInteractTopic">💗 {topic.likes.length}</button> }
                    <div id="commentaires">
                    { topic.comments && <button onClick={(comments)}className="buttonInteractTopic">💬 {topic.comments.length}</button>}
                        { showComments && topic && (
                            topic.comments.map((value, index) =>(
                                <React.Fragment>
                                    <div id="commentsFlex">
                                        <div id="commentPseudo">{value.user.pseudo}</div>
                                        <div id="commentDescription" key={value.id}>{value.description}</div>
                                    </div> 
                                </React.Fragment>
                            ))
                        )} 
                    </div>
                </div>
                <div id="topicListes">
                    <Link to="/main"><button className="buttonProfilCreate" type="button">Listes des topics</button></Link>
                </div>
            </main>
        </React.Fragment>
    )
}


// s'occuper des commentaires 
export default Topic;
