import { Link, Outlet, Route, Routes, useParams} from 'react-router-dom';
import './App.css';
import "../public/css/analisisFisico.css";
import React from 'react';
import MenuPrincipal from './components/MenuPrincipal';
import RegistroCaficultor from './components/RegistroCaficultor';
import AnalisisFisico from './components/AnalisisFisco';
import Catacion from './components/Catacion';


function App() {
  return (
    <div className="App">
      <body>
      <Routes>
          <Route path="/" element = {<MenuPrincipal/>}></Route>
          <Route path = 'RegistroCaficultor/' element  = {<RegistroCaficultor/>}></Route>
          <Route path = 'AnalisisFisico/' element  = {<AnalisisFisico/>}></Route>
          <Route path = 'Catacion/' element  = {<Catacion/>}></Route>
          <Route path = 'RegistroCaficultor/:siguiente' element  = {<RegistroCaficultor/>}></Route>
      </Routes>
      
      </body>
      </div>
  );
}


export default App;
