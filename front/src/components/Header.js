import { Link } from 'react-router-dom';

function Header() {

    function deconnecter() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
    return (
        <header>
                <div id="header">
                    <div id="title">
                        <Link to ="/" style={{ textDecoration: 'none' }}><h1>Groupomania</h1></Link>
                    </div>
                    <div className='nav'>
                        <Link to="/profil"><button className="buttonProfilCreate" type="button">Profil</button></Link>
                    </div>
                    <div className='nav'>
                        <Link to ="/" onClick={(deconnecter)}><button className="buttonProfilCreate" type="button">Deconnexion</button></Link>
                    </div>
                </div>
            </header>
    )
}

export default Header