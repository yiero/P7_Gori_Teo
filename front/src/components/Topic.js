import React, { useEffect, useState } from 'react';
import '../styles/topic.css';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from './Header';

function Topic () {

    const { id } = useParams();
    let token = localStorage.getItem('token');
    const [ topic, setTopic ] = useState("");

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

    const createDate = new Date(topic.createdAt).toLocaleDateString("fr");
    const updateDate = new Date(topic.updatedAt).toLocaleDateString("fr");

    return (
        <React.Fragment>
           <Header />
           <main id="main">
                <h2 id="topicTitle">{topic.title}</h2>
                <div id="interactButton">
                    <button className="interact">✏</button>
                    <button className="interact">❌</button>
                </div>
                <div id="topicDescription">{topic.description}</div>
                <div className="updateTopics">Crée le {createDate}</div>
                <div className="updateTopics">Mis à jour le {updateDate}</div>
                {/* <div>{topic.user.pseudo}</div> */}
                {/* <div>{topic.likes.length}</div>
                <div>{topic.comments.length}</div> */}
                <div id="topicListes">
                    <Link to="/main"><button className="buttonProfilCreate" type="button">Listes des topics</button></Link>
                </div>
            </main>
        </React.Fragment>
    )
}
// Les topic crée ne prenne pas en compte le retour à la ligne. 
export default Topic;