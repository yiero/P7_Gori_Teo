import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../styles/commentaire.css';


function Commentaire ({comment}) {

    const [ descriptionComment, setDescriptionComment ] = useState("");
    const [ isEditingComment, setEditingComment ] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    let token = localStorage.getItem('token');

    function editComment (e) {
        setEditingComment(!isEditingComment);
        e.preventDefault();
    }

    function deleteComment () {     
        fetch("http://localhost:3000/api/comment/" + comment.id, {
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
        navigate("/topic/" + id); 
    }

    function handleSubmitComment (e) {
        e.preventDefault();
        console.log(comment.id);
    }

    return (
        <form onSubmit={handleSubmitComment} key={comment.id} id="commentsFlex">
            <div id="pseudoInteractStyle">
                <div id="commentPseudo">{comment.user.pseudo}</div>
                    <div id="interactComment">
                        <button onClick={(editComment)} className="interact">✏</button>
                        <button onClick={(deleteComment)} className="interact">❌</button>
                    </div>
            </div>
            { !isEditingComment && <div id="commentDescription">{comment.description}</div>}
            { isEditingComment && <input onChange={(e) => setDescriptionComment(e.target.value)} type="text" value={comment.description} placeholder="Modifier le texte"></input>}
            { isEditingComment && <input type="submit" id="submitButtonComment"></input>}
        </form>
    )
}

export default Commentaire;