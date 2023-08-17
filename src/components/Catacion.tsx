import { useLocation, } from "react-router-dom";
import React, { useState } from 'react';

type defecto= {
    nombreDefecto: string;
    peso?: number,
    porcentaje: number;
}
type puntajeSCA = 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10
interface CatacionLote {
    id:number,
    codigo?: string;
    InfoView: "InfoVisible" | "InfoInvisible"
    variedad?: string;
    altura?: number;
    proceso?: string;
    factordeRendimiento?: number;
    defectos?: defecto[];
    tostion?: number;
    catador?: string;   
    fragancia?: puntajeSCA
}

export default function Catacion ()  {
    const [catacionCount, setCatacionCount] = useState(0);
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([]);

    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);
        
        const newCatacionElement:CatacionLote = {
            id:newCatacionCount,
            InfoView:"InfoInvisible"
        }
        setCatacionElements(prevElements => [...prevElements, newCatacionElement]);
    };
    const handleCodigo = (id: number, newCodigo:string) =>{ 
        setCatacionElements(prevData => 
            prevData.map(data => data.id === id ? {...data, codigo: newCodigo}: data)
        );
    }
    function handleInfoView (id:number){
            setCatacionElements( catacionElements.map(catacionElement=>{
                if (catacionElement.id===id){
                    if(catacionElement.InfoView==="InfoInvisible") return {...catacionElement, InfoView:"InfoVisible"}
                    else return {...catacionElement, InfoView:"InfoInvisible"}
                }
                else return catacionElement
            }
            ))
         
    }
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
                <button onClick={handleNuevaCatacion}>Agregar Catacion</button>
                {catacionElements.map(catacionElement => (
                    <div key={catacionElement.id}>
                        <br/>
                        <br/>
                        <br/>
                        <h1>Muestra {catacionElement.id}</h1>
                        <label htmlFor={`InputCodigo-${catacionElement.id}`}>Código de Lote </label>
                        <input type="text" id={`InputCodigo-${catacionElement.id}`} value={catacionElement.codigo} onChange={e => handleCodigo(catacionElement.id, e.target.value)}></input> lupa
                        <h2>Codigo de Lote:{catacionElement.codigo}</h2>
                        <button onClick={e=>handleInfoView(catacionElement.id)}>Ver info de lote</button>
    
                        <div className={catacionElement.InfoView}>
                            <h3>Altura: {catacionElement.altura} Variedad: {catacionElement.variedad} proceso: {catacionElement.proceso}</h3>
                            <h3>Fator de Rendimiento: {catacionElement.factordeRendimiento}</h3>
                            <h3> Defectos físicos:</h3>
                            <ul>
                            {catacionElement.defectos?.map(defecto=>(
                                <li> {defecto.nombreDefecto} { defecto.porcentaje}</li> 
                            ))}
                            </ul>

                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}