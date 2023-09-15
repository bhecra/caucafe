import React from 'react';
import { Lote} from "./MyTypes";
import { Link } from 'react-router-dom';
import logo from "../assets/images/smell_5235019.svg"

//@ts-ignore
import { Helmet } from 'react-helmet';
import { createAnalisisFisico, createLote } from './LoteInfo';

const miLote = createLote()

export default function MenuPrincipal() {
  return (
  
    <main className="main">
      <div>
      <Helmet>
      <title>Menu Principal</title>
    </Helmet>
      </div>
      <div className='imgFondoMP'>
        <div className='boxShadow'>

      <div className="headerMP">
        <img src={logo} alt="logo"/>  
      <Link to={'/SobreNosotros'}
          state={{miLote:miLote}}
          >Sobre Nosotros</Link>
      </div>

      <div className="nuevoAnalisis">
        <h1>Catadores de café</h1>
      <p>
¿Quieren realizar un análisis de café profesional?

En [nombre de la empresa], estamos comprometidos a brindar un software que facilite la cata y el envío de resultados a los caficultores.

Nuestro software es fácil de usar y está diseñado para ayudar a los catadores a realizar análisis precisos y reproducibles.

Haga click aquí para comenzar:
</p>
      {/* <img src={bean} alt='bean'></img> */}
      <div className='btn'>
      <h1>
        <Link to={'/RegistroLote'}
          state={{
            miLote:miLote
          }}
          target="_blank"
          >Nuevo Análisis</Link>
      </h1></div>
      </div>
      {/* <img src={fondo} alt="" className='fondoImg'/> */}
      {/* <div className='quienesSomos'><h1>¿Quiénes somos?</h1></div></div> */}
      </div>
      </div>
    </main>
  );
}


