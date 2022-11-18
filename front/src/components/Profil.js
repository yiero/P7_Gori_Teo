import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/profil.css'; 
import Header from './Header';

function Profil () {

    const { id } = useParams();
    let token = localStorage.getItem('token');
    let userId = parseInt(localStorage.getItem('userId'));
    const [ user, setUser ] = useState("");
    const [ isEditPseudo, setIsEditPseudo ] = useState(false);
    const [ isEditNom, setIsEditNom ] = useState(false);
    const [ isEditPrenom, setIsEditPrenom ] = useState(false);
    const [ isEditMail, setIsEditMail ] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/api/" + id, {
            method: "GET",
            headers: {
                'Authorization': "BEARER " + token
            }
        })
        .then(function(res) {
            if(res.ok) {
                return res.json();
            }
        })
        .then(function(value) {
            setUser(value);
        })
    }, [])

    function isAdmin () {
        return userId === user.id
    }

    function editPseudo() {
        setIsEditPseudo(!isEditPseudo);
    }
    function editNom() {
        setIsEditNom(!isEditNom);
    }
    function editPrenom() {
        setIsEditPrenom(!isEditPrenom);
    }
    function editMail() {
        setIsEditMail(!isEditMail);
    }


    const createDate = new Date(user.createdAt).toLocaleDateString("fr");

    return(
        <React.Fragment>
            <Header />
                <div id="mainProfil">
                    <div className="titleProfil">Pseudo</div>  
                        <div className="valueStyle">
                            <div className="champStyle">{user.pseudo}</div>
                            { isAdmin() && <button onClick={(editPseudo)}>✏</button>}
                                { isEditPseudo &&   
                                    <form className="inputStyle">pseudo modifié</form>       //input sans valeur à l'intérieur                                      
                                }
                        </div>
                    <div className="titleProfil">Nom</div>
                    <div className="valueStyle">
                            <div className="champStyle">{user.nom}</div>
                            <button onClick={(editNom)}>✏</button>
                            { isEditNom && <div className="inputStyle">pseudo modifié</div> }
                    </div>
                    <div className="titleProfil">Prenom</div>
                    <div className="valueStyle">
                            <div className="champStyle">{user.prenom}</div>
                            <button onClick={(editPrenom)}>✏</button>
                            { isEditPrenom && <div className="inputStyle">pseudo modifié</div> }
                    </div>
                    <div className="titleProfil">Email</div>
                    <div className="valueStyle">
                            <div className="champStyle">{user.email}</div>
                            <button onClick={(editMail)}>✏</button>
                            { isEditMail && <div className="inputStyle">pseudo modifié</div> }
                    </div>
                    <div className="titleProfil">Membre depuis le</div> 
                    <div id="createAtStyle">
                            <div id="createAt">{createDate}</div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Profil