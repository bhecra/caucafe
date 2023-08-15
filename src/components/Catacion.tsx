import { useLocation, } from "react-router-dom";
import React, { useState } from 'react';

type defecto= {
    id: number;
    nombre: string;
    porcentaje: number;
}
type puntajeSCA = 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10
interface CatacionData {
    codigo: string;
    variedad: string;
    altura: number;
    proceso: string;
    factordeRendimiento: number;
    defectos: defecto[];
    tostion: number;
    catador: string;
    fragancia: puntajeSCA
}
export default function Catacion ()  {
    const [catacionCount, setCatacionCount] = useState(0);
    const [catacionElements, seCatacionElements] = useState<JSX.Element[]>([]);

    const handleButtonClick = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);

        const newInputElement = <input key={newCatacionCount} type="text" placeholder={`Input ${newInputCount}`} />;
        setInputElements(prevElements => [...prevElements, newInputElement]);
    };

   
    const location= useLocation()
    const { data } = location.state || {};
    const {ID, NombreCaficultor,  Municipio} = data || {};
    //const {data} = useLocation()
    return(
       <div>
           <h2>Codigo del lote {ID}</h2>
           <h2>Nombre de caficultor: {NombreCaficultor}</h2>
           <h2>Municipio de cultivo: {Municipio}</h2>
           <h1> Esta es la pagina de catacion</h1>
           <div>
                <h1>Botón para Agregar Inputs</h1>
                <button onClick={handleButtonClick}>Agregar Input</button>
                {inputElements.map(inputElement => inputElement)}
            </div>
        </div>
    )
}