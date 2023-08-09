import './App.css';
import React from 'react';
import Header from './components/Header';
import Main from "./components/Main"
import Footer from "./components/Footer";
import './App.css';

const Minombre: string = "Mi nombre"
function App() {
  return (
    <div className="app">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}


export default App;
