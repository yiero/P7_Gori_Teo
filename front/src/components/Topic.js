import React, { useEffect, useState } from 'react';
import '../styles/topic.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from "react-router-dom";

function Topic () {

    const { id } = useParams();
    let token = localStorage.getItem('token');
    const [ topic, setTopic ] = useState("");
    const navigate = useNavigate();
    let [ isEditing, setEditing ] = useState("");

    function edit () {
        setEditing = isEditing("false");
        console.log(edit());
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
                console.log(value) 
            })
    }, []) 
    
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

    function comments () {
        for (let i = 0; i < topic.comments.length; i++) {
            console.log(topic.comments[i].description);
        }  
    }

    const createDate = new Date(topic.createdAt).toLocaleDateString("fr");
    const updateDate = new Date(topic.updatedAt).toLocaleDateString("fr");

    return (
        <React.Fragment>
           <Header />
           <main id="main">
                <h2 id="topicTitle">{topic.title}</h2>
                <div id="interactButton">
                    <button onClick={(edit)}className="interact">✏</button>
                    <button onClick={(deleteTopic)}className="interact">❌</button>
                </div>
                <div id="pseudoDescription">
                    <div id="topicDescription">{topic.description}</div>
                    { topic.user && <div id="pseudoTopic">{topic.user.pseudo}</div> }
                </div>
                <div className="updateTopics">Crée le {createDate}</div>
                <div className="updateTopics">Mis à jour le {updateDate}</div>
                <div id="interaction">
                    { topic.likes && <button className="buttonInteractTopic">💗 {topic.likes.length}</button> }
                    { topic.comments &&<button onClick={(comments)}className="buttonInteractTopic">💬 {topic.comments.length}</button> }
                </div>
                <div id="topicListes">
                    <Link to="/main"><button className="buttonProfilCreate" type="button">Listes des topics</button></Link>
                </div>
            </main>
        </React.Fragment>
    )
}
// Les topic crée ne prenne pas en compte le retour à la ligne. 
export default Topic;