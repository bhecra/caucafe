import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/images/logo.svg"

//@ts-ignore
import { Helmet } from 'react-helmet';
import {createLote} from './LoteInfo';
import BarraNavegacion from './BarraNavegacion';

const miLote = createLote()

export default function MenuPrincipal() {
  return (
  
    <div className="main">
      <Helmet>
      <title>Menu Principal</title>
      </Helmet>
      <div className='imgFondoMP'>
        <div className='boxShadow'>
          <div className="nuevoAnalisis">
            <p style={{fontSize:"20px"}}>
              Con tu ayuda, podemos mejorar la calidad del café del Cauca
              haciendo que los caficultores del departamento conozcan
              en detalle la calidad del Café que están produciendo, los defectos físicos o 
              en taza que tengan y cómo corregirlos.
            </p>
            <Link to="/SobreNosotros">¿Quiénes somos?</Link>
            {/* <img src={bean} alt='bean'></img> */}
            <div className='btn'>
                <Link to={'/RegistroLote'}
                  state={{
                    miLote:miLote
                  }}
                  target="_blank"
                  ><button>
                    Nuevo Análisis
                  </button>
                </Link>
            </div>
          </div>
          {/* <img src={fondo} alt="" className='fondoImg'/> */}
          {/* <div className='quienesSomos'><h1>¿Quiénes somos?</h1></div></div> */}
        </div>
      </div>
    </div>
  );
}


