

import foto from "../assets/images/fotos-devs.png"
import { Link } from 'react-router-dom';
//@ts-ignore
import { Helmet } from 'react-helmet';
import nosotros from "../assets/images/R.jpg"


export default function SobreNosotros() {
  return (
    <main className="">
      <div>
        <Helmet>
          <title>Sobre Nosotros</title>
        </Helmet> </div>
      <div className="headerMP">
          <Link to={"/"} >
            <div style={{marginLeft:"10px"}}>Inicio</div>
          </Link>
        
      </div>
    <section className="sobre-nosotros">
      <div className="imagen-creadores">
        <img
          src= {nosotros}
          alt="Imagen de los Creadores"
          className="imagen-creadores"
        />
      </div>
      <div className="descripcion">
        <h2>Sobre Nosotros</h2>
        <p>
          Somos un equipo apasionado que se dedica a crear experiencias web
          únicas. Nuestro propósito es brindar soluciones innovadoras y
          hermosas que satisfagan las necesidades de nuestros clientes y
          usuarios.
        </p>
      </div>
    </section>
  
    </main>
  )
}