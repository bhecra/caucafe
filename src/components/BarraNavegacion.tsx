import React from 'react';
import { Link } from 'react-router-dom';
import { Lote } from './MyTypes';

function BarraNavegacion  ({miLote}:{miLote:Lote}){
  return (
    <nav>
      <ul>
        <li>
          <Link state={{miLote: miLote }}  to="/RegistroLote">Info de Lote</Link>
        </li>
        <li>
          <Link state={{miLote: miLote }} to="/analisisFisico" >Análisis Físico</Link>
        </li>
        <li>
          <Link state={{miLote: miLote }} to="/Catacion" >Catación</Link>
        </li>
      </ul>
    </nav>
  );
};

export default BarraNavegacion;
