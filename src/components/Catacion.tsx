import { useLocation, } from "react-router-dom";

export default function Catacion ()  {
   
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
        </div>
    )
}