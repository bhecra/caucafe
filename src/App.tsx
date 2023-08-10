import {Route, Routes} from 'react-router-dom';
import './App.css';
import React from 'react';
import MenuPrincipal from './components/MenuPrincipal';
import RegistroCaficultor from './components/RegistroCaficultor';
import AnalisisFisico from './components/AnalisisFisico';
import Catacion from './components/Catacion';
import RegistroLote from './components/RegistroLote';



function App() {
  return (
    <div className="App">
      <body>
      <Routes>
          <Route path="/" element = {<MenuPrincipal/>}></Route>
          <Route path = 'RegistroCaficultor/' element  = {<RegistroCaficultor/>}></Route>
          <Route path = 'AnalisisFisico' element  = {<AnalisisFisico/>}></Route>
          <Route path = 'Catacion' element  = {<Catacion/>}></Route>
          <Route path = 'RegistroCaficultor/:siguiente' element  = {<RegistroCaficultor/>}></Route>
          <Route path = 'RegistroLote/:siguiente' element = {<RegistroLote/>}></Route>
      </Routes>
      </body>
    </div>
  );
}


export default App;
