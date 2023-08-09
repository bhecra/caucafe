import { Link, Outlet, Route, Routes, useParams} from 'react-router-dom';
import './App.css';
import React from 'react';
import RegistroCaficultor from './components/RegistroCaficultor';


function App() {
  return (
    <div className="App">
     <Routes>
        <Route path = "/registro_caficultor" element={<RegistroCaficultor/>}>  </Route>
        
     </Routes>
    </div>
  );
}

export default App;
