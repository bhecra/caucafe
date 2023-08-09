import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faInstagram, faFacebook } from '@fortawnesome/free-brand-svg-icons'; // Importa los iconos de redes sociales

function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#">Contacto</a>
            <a href="#">Sobre nosotros</a>
          </div>
          <div className="footer-social">
            <a href="https://www.instagram.com">
              {/* <FontAwesomeIcon icon={faInstagram} /> */}
            </a>
            <a href="https://www.facebook.com" >
              {/* <FontAwesomeIcon icon={faFacebook} /> */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
