import React from 'react';
import { Link } from 'react-router-dom';
import { Lote } from './MyTypes';
import logo from "../assets/images/logo.svg"
import { createLote } from './LoteInfo';

function BarraNavegacion  ({miLote=createLote()}:{miLote?:Lote}){
  return (
    <div className='headerMP'>
        <div className='headerLink'>
          <Link to='/' target='_blank'>
              <img height={50} src={logo} alt="logo-caucafe" ></img>
          </Link>
        </div>
        <div>
          <Link state={{miLote: miLote }}  to="/RegistroLote">Registro</Link>
        </div>
        <div>
          <Link state={{miLote: miLote }} to="/analisisFisico" >Análisis Físico</Link>
        </div>
        <div>
          <Link state={{miLote: miLote }} to="/catacion" >Catación</Link>
        </div>
        <div>
          <Link state={{miLote: miLote }} to="/enviarAnalisis" >Enviar Análisis</Link>
        </div>
        <div>
          <Link to={'/SobreNosotros'}
            state={{miLote:miLote}}
            target='_blank'>
            Sobre Nosotros
          </Link>
        </div>
    </div>
  );
};

export default BarraNavegacion;
