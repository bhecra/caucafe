import { useState } from "react";
import logo from "../logo.svg"
import foto from "../assets/images/fotos-devs.png"
import { Link } from 'react-router-dom';
import { Lote, CatacionLote } from "./MyTypes";

const miLote:Lote = {
    codigo: '',
    nombreCaficultor: '',
    municipio: '',
    proceso: '',
    variedad: '',
}


export default function SobreNosotros() {
    return (
        <main className="">
            <div className="headerMP">
                <img src={logo} alt="logo" />
                <Link to={'/RegistroLote'}
          state={{
            miLote:miLote
          }}
          target="_blank"
          >Nuevo Análisis</Link>
            </div>
            <div className="contentSobreNosotros">
                <div className="imgSobreNosotros">
                    <img src={foto} alt="foto-devs" />
                </div>

                <div className="mision">
                    <h1>Nuestra historia</h1>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam autem nisi odit ratione optio ab consequatur veritatis dolorum dicta sequi, aperiam eaque quod vitae officia facilis, est fugit aspernatur aut?</p>
                </div>
            </div>

            {/* <footer>
        <div className="container"> 
          <div className="footer-content">
            <div className="footer-links">
              <a href="#">Contacto</a>
              <a href="#">Sobre nosotros</a>
            </div>
            <div className="footer-social">
              <a href="https://www.instagram.com" target="_blank"></a>
              <a href="https://www.facebook.com" target="_blank"></a>
            </div>
          </div>
        </div>
        
      </footer> */}
        </main>
    )


}