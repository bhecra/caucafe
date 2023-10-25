

import foto from "../assets/images/fotos-devs.png"
import { Link } from 'react-router-dom';
//@ts-ignore
import { Helmet } from 'react-helmet';
import nosotros from "../assets/images/R.jpg"
import { SobreNosotros } from "./infoQuienesSomos";


export default function AboutUs() {
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
      <SobreNosotros
  title="Sobre Nosotros"
  description="Somos un equipo apasionado que se dedica a crear experiencias web únicas. Nuestro propósito es brindar soluciones innovadoras y hermosas que satisfagan las necesidades de nuestros clientes y usuarios."
  image={nosotros}
  imageOnLeft={true} // Cambia a 'false' para mover la imagen a la derecha
/>

<SobreNosotros
title="lorem"
description= "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc egestas commodo dui quis sodales. Suspendisse ultrices dapibus lectus ac pretium. Curabitur eget lacus sapien. Cras accumsan quam tortor, eget egestas ipsum facilisis id. Phasellus malesuada malesuada felis, in consequat nisi."
image={foto}
imageOnLeft={false}
/>
  
    </main>
  )
}