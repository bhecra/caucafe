import React from 'react';
import Section from './Section';
import coffeeBeansImage from "../assets/images/coffee-beans.svg"
import farmer from "../assets/images/farmer_2979790.svg"
import bean from "../assets/images/search-coffe-bean.svg"
import smell from "../assets/images/smell_5235019.svg"
import { Link, Outlet, Route, Routes, useParams} from 'react-router-dom';

const sectionsData = [
    {
      imageSrc: coffeeBeansImage,
      altText: 'coffe-bag',
      links: [
        { text: 'Registrar lote de cps', route: '#',},
        { text: 'Ver historial de compras', route: '#' },
      ],
    },
    {
        imageSrc: farmer,
        altText: "farmer",
        links: [
            {text: "Registrar caficultor", route: "RegistroCaficultor", componente: "RegistroCafcultor"}
        ]
    }, 
    {
        imageSrc: bean,
        altText: "bean",
        links:[
            {text: "Nuevo análisis físico", route: "#"},
            {text:"Ver historial de análisis",route:"#"},
        ]
    },
    {
        imageSrc: smell,
        altText:'smell',
        links:[
            {text: "Nueva catación", route:"#"},
            {text: "Ver historial de cataciones", route:"#"}
        ]
    }
    // Agrega más objetos para cada sección
  ];

export default function MenuPrincipal() {
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


