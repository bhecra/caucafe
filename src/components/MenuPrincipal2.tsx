import React from 'react';

import { Lote, CatacionLote } from "./MyTypes";
import { Link } from 'react-router-dom';

  const miLote:Lote = {
    codigo: '',
    nombreCaficultor: '',
    municipio: '',
    proceso: '',
    variedad: '',
}
export default function MenuPrincipal() {
  return (
    <main className="main">
      <h1>
        <Link to={'/RegistroLote'}
          state={{
            miLote:miLote
          }}
          target="_blank"
          >Nuevo Análisis</Link>
      </h1>
      <h1>¿Quiénes somos?</h1>
    </main>
  );
}


