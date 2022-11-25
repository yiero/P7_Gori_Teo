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
    const [ pseudo, setPseudo ] = useState("");
    const [ isEditNom, setIsEditNom ] = useState(false);
    const [ nom, setNom ] = useState("");
    const [ isEditPrenom, setIsEditPrenom ] = useState(false);
    const [ prenom, setPrenom ] = useState("");
    const [ isEditMail, setIsEditMail ] = useState(false);
    const [ mail, setMail ] = useState("");

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

    function isOwner () {
        return userId === user.id
    }

    function editPseudo(e) {
        e.preventDefault();
        setIsEditPseudo(!isEditPseudo);
    }
    function editNom(e) {
        e.preventDefault();
        setIsEditNom(!isEditNom);
    }
    function editPrenom(e) {
        e.preventDefault();
        setIsEditPrenom(!isEditPrenom);
    }
    function editMail(e) {
        e.preventDefault();
        setIsEditMail(!isEditMail);
    }

    function handleSubmitPseudo(e) {
        e.preventDefault();
        const body = {
            pseudo: pseudo
        }

        fetch("http://localhost:3000/api/" + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "BEARER " + token
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json()
            } else {
                return res.status;
            }
        })
        alert("Modification du pseudo avec succès !")
        alert("Rafraichie la page mon cousin !")
    }

    function handleSubmitNom(e) {
        e.preventDefault();
        const body = {
            nom: nom
        }

        fetch("http://localhost:3000/api/" + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "BEARER " + token
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json()
            } else {
                return res.status;
            }
        })
        alert("Vous venez de modifier votre Nom !")
    }

    function handleSubmitPrenom(e) {
        e.preventDefault();
        const body = {
            prenom: prenom
        }

        fetch("http://localhost:3000/api/" + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "BEARER " + token
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json()
            } else {
                return res.status;
            }
        })
        alert("Vous venez de modifiez votre prénom !")
    }

    function handleSubmitMail(e) {
        e.preventDefault();
        const body = {
           email: mail
        }

        fetch("http://localhost:3000/api/" + id, {
            method: "PUT",
            headers: {
                'Content-type': 'application/json',
                'Authorization': "BEARER " + token
            },
            body: JSON.stringify(body)
        })
        .then(function(res) {
            if (res.ok) {
                return res.json()
            } else {
                return res.status;
            }
        })
        alert("Vous venez de modifiez votre email !")
    }


    const createDate = new Date(user.createdAt).toLocaleDateString("fr");

    // (isAdmin() || isOwner()) condition compte admin
    return(
        <React.Fragment>
            <Header />
                <div id="mainProfil">
                    <div className="titleProfil">Pseudo</div>  
                        <form onSubmit={handleSubmitPseudo} className="valueStyle">
                            <div className="champStyle">{user.pseudo}</div>
                            { isOwner() && <button onClick={(editPseudo)}>✏</button>}
                                { isEditPseudo &&   
                                    <input onChange={(e) => setPseudo(e.target.value)} type="text" className="inputStyle" placeholder="Nouveau pseudo" required></input>                                    
                                }
                                { isEditPseudo &&
                                    <input type="submit" value="Modifier" className="buttonEditProfil"></input>
                                }
                        </form>
                    <div className="titleProfil">Nom</div>
                        <form onSubmit={handleSubmitNom} className="valueStyle">
                            <div className="champStyle">{user.nom}</div>
                                { isOwner() && <button onClick={(editNom)}>✏</button>}
                                { isEditNom && 
                                    <input onChange={(e) => setNom(e.target.value)} type="text" className="inputStyle" placeholder="Nouveau nom" required></input> 
                                }
                                { isEditNom &&
                                    <input type="submit" value="Modifier" className="buttonEditProfil"></input>
                                }
                        </form>
                    <div className="titleProfil">Prenom</div>
                        <form onSubmit={handleSubmitPrenom} className="valueStyle">
                            <div className="champStyle">{user.prenom}</div>
                                { isOwner() && <button onClick={(editPrenom)}>✏</button>}
                                { isEditPrenom && 
                                    <input onChange={(e) => setPrenom(e.target.value)} type="text" className="inputStyle" placeholder="Nouveau prenom"></input> 
                                }
                                { isEditPrenom && 
                                    <input type="submit" value="Modifier" className="buttonEditProfil"></input>
                                }
                        </form>
                    <div className="titleProfil">Email</div>
                        <form onSubmit={handleSubmitMail} className="valueStyle">
                            <div className="champStyle">{user.email}</div>
                                { isOwner() && <button onClick={(editMail)}>✏</button>}
                                { isEditMail && 
                                    <input onChange={(e) => setMail(e.target.value)} type="email" className="inputStyle" placeholder="Nouvel email"></input> 
                                }
                                { isEditMail && 
                                    <input type="submit" value="Modifier" className="buttonEditProfil"></input>
                                }
                        </form>
                    <div className="titleProfil">Membre depuis le</div> 
                    <div id="createAtStyle">
                            <div id="createAt">{createDate}</div>
                    </div>
                </div>
        </React.Fragment>
    )
}

export default Profil