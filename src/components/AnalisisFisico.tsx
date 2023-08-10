//import { useState } from "react";
import { useLocation, } from "react-router-dom";

export default function AnalisisFisico ()  {
   
    const location= useLocation()
    const { data } = location.state || {};
    const {ID, NombreCaficultor,  Municipio, Variedad} = data || {};
    //const {data} = useLocation()
    return(
       <div>
           <h2>Codigo del lote {ID}</h2>
           <h2>Nombre de caficultor: {NombreCaficultor}</h2>
           <h2>Municipio de cultivo: {Municipio}</h2>
           <h2>Variedad de cultivo: {Variedad}</h2>
           <h1> Este es el análisis fisico</h1>
        </div>
    )
}