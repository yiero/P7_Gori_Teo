import React from 'react';
import '../styles/footer.css';

function Footer() {
    return(
        <React.Fragment>
        <footer>
            <div id="footerStyle">
                <div className="footerName">Created by Téo Gori</div>
                <iconify-icon className="footerName" icon="simple-icons:ferrari" width="30px" height="30px"></iconify-icon>
            </div>
        </footer>
        </React.Fragment>
    )
}

export default Footer
