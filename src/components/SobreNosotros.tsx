


import { Link } from 'react-router-dom';
//@ts-ignore
import { Helmet } from 'react-helmet';
import CGS from '../assets/images/CGS.png'
import LFMM from '../assets/images/IMG_8268.png'
import Jovenes from '../assets/images/ji.jpg'
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
            <h2 style={{marginLeft:"10px"}}>Contacto: email: gerencia@protocolgroupsas.com</h2>
            
      </div>
      <SobreNosotros
        title="Jóvenes Investigadores II "
        description="Esta plataforma es elaborada como un prototipo de prueba dentro de una investigación, que 
        se ejecuta en el marco del proyecto Jóvenes Investigadores II. Este proyecto busca incentivar 
        la investigación y la innovación en los jóvenes del departamento "
        image={Jovenes}
        imageOnLeft={false}
      />
      <SobreNosotros
        title="Luis Fernando Moncayo (Jóven Investigador)"
        description="Soy Ingeniero Físico de la Universidad del Cauca y desde el 2019 trabajo en aplicación 
        de tecnología a la industria de la caficultura. Mientras aprendía sobre el maravilloso mundo del café,
        encontré diferentes espacios donde se podrían aplicar tecnologías digitales. Me gustaría aportar para
        avanzar hacia una caficultura digna, tecnificada y sostenible en el departamento y en el país"
        image={LFMM}
        imageOnLeft={true} // Cambia a 'false' para mover la imagen a la derecha
      />

      <SobreNosotros
        title="phD. Carolina González Serrano (Tutora de Investigación)"
        description= "Doctora en Tecnologías de la Información y la Comunicación de la Universidad de Vigo (España).Desarrolló su trabajo investigativo en el área de Inteligencia Artificial y Educación. Investigadora Senior, reconocida por el Ministerio de Ciencia Tecnología e Innovación – MinCiencias.  Fundadora y miembro del Grupo de Investigación en Inteligencia Computacional - GICO (Categoria B – MinCiencias). Magister en Telemática. Especialista en Redes y Servicios Telemáticos. Ingeniera de Sistemas.  "
        image={CGS}
        imageOnLeft={false}
      />
  
    </main>
  )
}