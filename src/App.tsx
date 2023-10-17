import { Route, Routes } from 'react-router-dom';
import './App.css';
import React from 'react';
import MenuPrincipal from './components/MenuPrincipal2';
import RegistroCaficultor from './components/RegistroCaficultor';
import AnalisisFisicoPage from './components/AnalisisFisico';
import Catacion from './components/Catacion';
import RegistroLote from './components/RegistroLote'
import PruebaTwilio from './components/PruebaTwilio';
import SobreNosotros from './components/SobreNosotros';
import EnviarAnalisis from './components/EnviarAnalisis';
import { createLote } from './components/LoteInfo';
import { Lote } from './components/MyTypes';
const miLote:Lote = createLote()
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<MenuPrincipal />}></Route>
        <Route path="SobreNosotros" element={<SobreNosotros />}></Route>
        <Route path='RegistroCaficultor/' element={<RegistroCaficultor />}></Route>
        <Route path='AnalisisFisico/' element={<AnalisisFisicoPage />}></Route>
        <Route path="catacion/" element={<Catacion />} />
        <Route path='RegistroCaficultor/:siguiente' element={<RegistroCaficultor />}></Route>
        <Route path='RegistroLote/' element={<RegistroLote />}></Route>
        <Route path='enviarAnalisis/' element={<EnviarAnalisis />}></Route>
        <Route path="prueba" element={<PruebaTwilio />}> </Route>
      </Routes>
    </div>

  );
}


export default App;
