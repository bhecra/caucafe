import { Link, Outlet, Route, Routes, useParams} from 'react-router-dom';
import './App.css';
import React from 'react';
const Home = () => <h1>Home</h1>
const User = () => <h1>user</h1>

function App() {
  return (
    <div className="App">
     <InputTexto nombre="Nombre de caficultor"/>
     <InputTexto nombre="Nombre de la finca"/>
    </div>
  );
}


export default App;
