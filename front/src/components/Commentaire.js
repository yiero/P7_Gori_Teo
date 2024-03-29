import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import '../styles/commentaire.css';
import { Link } from 'react-router-dom';


function Commentaire ({comment}) {

    const [ descriptionComment, setDescriptionComment ] = useState("");
    const [ isEditingComment, setEditingComment ] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    let userId = parseInt(localStorage.getItem('userId'));
    let token = localStorage.getItem('token');
    let admin = JSON.parse(localStorage.getItem('admin'));

    function editComment (e) {
        setEditingComment(!isEditingComment);
        e.preventDefault();
    }

    function isOwner () {
        return userId === comment.userId
    }

    function isAdmin() {
        return admin
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
        alert("Commentaire supprimé !")
    }

    function handleSubmitComment (e) {
        e.preventDefault();
        const body = {
            description: descriptionComment
        }

        fetch("http://localhost:3000/api/comment/" + comment.id, {
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
        alert("Commentaire mis à jour !")
    }


    return (
        <div key={comment.id} id="commentsFlex">
            <div id="pseudoInteractStyle">
                <Link to={"/profil/" + comment.userId} id="commentPseudo">{comment.user.pseudo}</Link>
                    <div id="interactComment">
                        { (isOwner() || isAdmin()) && <button onClick={(editComment)} className="interact">✏</button> }
                        { (isOwner() || isAdmin()) && <button onClick={(deleteComment)} className="interact">❌</button> }
                    </div>
            </div>
            <form onSubmit={handleSubmitComment}>
                { !isEditingComment && <div id="commentDescription">{comment.description}</div>}
                { isEditingComment && <input id="inputDescriptionComment" onChange={(e) => setDescriptionComment(e.target.value)} name="descriptionComment" type="text" placeholder="Modifier le texte"></input>}
                { isEditingComment && <input type="submit" id="submitButtonComment"></input>}
            </form>
        </div>
    )
}

export default Commentaire;