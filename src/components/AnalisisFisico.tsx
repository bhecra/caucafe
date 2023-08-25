//import { useState } from "react";
import { useLocation, } from "react-router-dom";
import { useState } from "react";
import { Lote } from "./MyTypes";
//import AnalisisFisicoLote from "./AnalisisFisicoLote";
//(import '.../public/css/registerCaficultor.css';
//<AnalisisFisicoLote {...codigo:"w4e234"; variedad:Variedad; altura:1800; proceso:"Lavado"}/>
function AnalisisFisicoLote ({codigo, variedad, altura, proceso, municipio}:{codigo:string, variedad:string, altura:number, proceso:string, municipio:string}) {
    //export default function AnalisisFisicoLote  ({codigo, altura}:{codigo:string, altura:number}) {
    console.log("Entre a la funcion")
    return (
            <div>
                <body>

                    <h2>Codigo del lote {codigo}</h2>
                    <h2>Nombre de caficultor: {variedad}</h2>
                    <h2>Municipio de cultivo: {municipio}</h2>
                    <h2>Variedad de cultivo: {variedad}</h2>
                    <h1> Este es el análisis fisico</h1>
                </body>
            </div>
    )}
export default function AnalisisFisico ()  {
    const location= useLocation()
    const { miLote}:{miLote:Lote} = location.state || {};
    const [reactLote, setReactLote] = useState(miLote);
    //const {ID, NombreCaficultor,  Municipio, Variedad, AlturaLote, ProcesoLote}:{ID:string, NombreCaficultor:string,  Municipio:string, Variedad:string, AlturaLote:number, ProcesoLote:string} = data || {};
    //const {data} = useLocation()                      
    
        //<AnalisisFisicoLote  codigo={ID} variedad = {Variedad} municipio ={Municipio} altura={AlturaLote} proceso ={ProcesoLote} />
    return(
       <div className="Inputs">
           <body>
            <h1>
                {reactLote.nombreCaficultor}
                {reactLote.altura}
            </h1>
           </body>
        </div>
    )
}