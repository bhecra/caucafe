import './App.css';
import  InputTexto  from './components/InputTexto';
import React from 'react';

function App() {
  return (
    <div className="App">
     <InputTexto nombre="Nombre de caficultor"/>
     <InputTexto nombre="Nombre de la finca"/>
    </div>
  );
}

export default App;
