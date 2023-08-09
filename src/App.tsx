import './App.css';
import  InputTexto  from './components/InputTexto';
import React from 'react';
const Home = () => <h1>Home</h1>
const User = () => <h1>user</h1>

const Minombre: string = "Mi nombre"
function App() {
  return (
    <div className="App">
     <InputTexto nombre="Nombre de caficultor"/>
     <InputTexto nombre="Nombre de la finca"/>
    </div>
  );
}

export default App;
