import React from 'react';
import Section from './Section';
import coffeeBeansImage from "../assets/images/coffee-beans.svg"
import farmer from "../assets/images/farmer_2979790.svg"
import bean from "../assets/images/search-coffe-bean.svg"
import smell from "../assets/images/smell_5235019.svg"

const sectionsData = [
    {
      imageSrc: coffeeBeansImage,
      altText: 'coffe-bag',
      links: [
        { text: 'Registrar lote de cps', href: '#' },
        { text: 'Ver historial de compras', href: '#' },
      ],
    },
    {
        imageSrc: farmer,
        altText: "farmer",
        links: [
            {text: "Registrar caficultor", href: "#"}
        ]
    }, 
    {
        imageSrc: bean,
        altText: "bean",
        links:[
            {text: "Nuevo análisis físico", href: "#"},
            {text:"Ver historial de análisis",href:"#"},
        ]
    },
    {
        imageSrc: smell,
        altText:'smell',
        links:[
            {text: "Nueva catación", href:"#"},
            {text: "Ver historial de cataciones", href:"#"}
        ]
    }
    // Agrega más objetos para cada sección
  ];

function Main() {
  return (
    <main className="main">
      {sectionsData.map((section, index) => (
        <Section
          key={index}
          imageSrc={section.imageSrc}
          altText={section.altText}
          links={section.links}
        />
      ))}
    </main>
  );
}

export default Main;
