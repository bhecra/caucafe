import {Link, useParams } from "react-router-dom";
import InputTexto from "./InputTexto";

export default function RegistroCaficultor (){
    const {siguiente} = useParams();
    return(
        <body>
        <InputTexto nombre="Nombre de caficultor"/>
        <InputTexto nombre="Nombre de la finca"/>
        <Link to={`/${siguiente}`}> Siguiente</Link>
        </body>
    )
}