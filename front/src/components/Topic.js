import React, { useEffect, useState } from 'react';
import '../styles/topic.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';
import { useNavigate } from "react-router-dom";
import Commentaire from './Commentaire';

function Topic () {
    //TODO : Création de commentaire

    const { id } = useParams();
    let token = localStorage.getItem('token');
    let userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [ topic, setTopic ] = useState("");
    const [ isEditing, setEditing ] = useState(false);
    const [ showComments, setShowComments ] = useState(false);
    const [ title, setTitle ] = useState("");
    const [ description, setDescription ] = useState("");
    const [ isAdmin, setIsAdmin ] = useState(false);
    const [ comment, setComment ] = useState("");

    function edit () {
        setEditing(!isEditing);
    }

    function comments () {
        setShowComments(!showComments);
    }

    function admin () {
        if (userId === topic.userId) {
            setIsAdmin(true);
        }
    }
    // test pour masquer bouton edit si non propriétaire
    // créer une fonction pour comparer les deux userId, si ils sont égal alors passer la valeur isAdmin à true et afficher bouton sinon false et masquer
    //problème du if qui ne s'éxecute pas (un console.log dans la fonction s'affiche grace au useEffect, mais la valeur de isAdmin ne change pas)

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
                console.log(isEditing)
            })
    }, [isEditing, admin()]) 

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

    function newComment(e) {
        e.preventDefault()
        let token = localStorage.getItem('token');
        const body = {
            description: comment,
            topicId: id
        }

        fetch("http://localhost:3000/api/comment/", {
            method: "POST",
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
    }


    const createDate = new Date(topic.createdAt).toLocaleDateString("fr");
    const updateDate = new Date(topic.updatedAt).toLocaleDateString("fr");


    
    

    return (
        <React.Fragment>
           <Header />
           <main id="main">
                <div id="interactButton">
                    { !isAdmin && <button onClick={(edit)}className="interact">✏</button>}
                    <button onClick={(deleteTopic)}className="interact">❌</button>
                </div>
                    <form onSubmit={handleSubmit}>
                        { !isEditing && <h2 id="topicTitle">{topic.title}</h2> }
                        { isEditing && <div id="inputTitleFlex"><input onChange={(e) => setTitle(e.target.value)} id="inputTitle" type="text" placeholder="Modifiez le titre" value={title}></input></div>}
                        <div id="pseudoDescription">
                            { !isEditing && <div id="topicDescription">{topic.description}</div>}
                            { isEditing && <input onChange={(e) => setDescription(e.target.value)} id="inputDescription" type="text" placeholder="Modifiez le texte" value={description}></input>}
                            { topic.user && <Link to={"/profil/" + topic.userId} id="pseudoTopic">{topic.user.pseudo}</Link> }
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
                    <form onSubmit={newComment} id="createComment">
                        <h4>Ajoutez un commentaire</h4>
                        <textarea onChange={(e) => setComment(e.target.value)} type="text" name="description" id="description_comment" placeholder="Entrez votre message" required></textarea>
                        <input type="submit" value="Créer" className="buttonProfilCreate"></input>
                    </form>
                    <Link id="buttonListeStyle" to="/main"><button className="buttonProfilCreate" type="button">Listes des topics</button></Link>
                </div>
            </main>
        </React.Fragment>
    )
}


// s'occuper des commentaires 
export default Topic;
