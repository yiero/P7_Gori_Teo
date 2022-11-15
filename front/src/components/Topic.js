import React, { useEffect, useState } from 'react';
import '../styles/topic.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from "react-router-dom";
import Commentaire from './Commentaire';

function Topic () {
    //TODO : mettre en place l'edit de commentaire (comme sur les topics) et préparer le fetch

    // soucis primaire de l'edit, au clique sur le déroulement des commentaires, les fonction avec paramètre s'éxécute,
     // et ferme directement les conditions et le form 
     // problème numéro 2, la modification se fait sur tous les éléments de la boucle

     // stop propagation pour arrêter la remontée d'exceptions
    

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

    function comments () {
        setShowComments(!showComments);
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
    }, [isEditing]) 

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

    function handleLike() {
        fetch ("http://localhost:3000/api/topic/"+ id + "/like", {
            method: "POST",
            headers: { 
                'Authorization': "BEARER " + token
            }
        })
        .then(function(res) {
            if (res.ok) {
                return res.json();
            }
        })
        window.location.reload();
    }

    function handleUnlike() { 
        fetch ("http://localhost:3000/api/topic/"+ id + "/like", {
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
            window.location.reload();
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
                        { topic.likes && <button onClick={(handleLike)} className="buttonInteractTopic">💗 {topic.likes.length}</button> }
                        { topic.likes && <button onClick={(handleUnlike)} className="buttonInteractTopic">🖤</button> }
                        <div id="commentaires">
                        { topic.comments && <button onClick={(comments)} className="buttonInteractTopic">💬 {topic.comments.length}</button>}
                            { showComments && topic && (
                                topic.comments.map((value) =>(
                                    <Commentaire comment={value}/>
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
