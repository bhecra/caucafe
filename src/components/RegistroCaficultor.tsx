import {Link, useParams } from "react-router-dom";
import InputTexto from "./InputTexto";

export default function RegistroCaficultor (){
    const {siguiente} = useParams();
    return(
        <body>
        <InputTexto nombre="Nombre de caficultor" Id="NombreCaficultor"/>
        <InputTexto nombre="Nombre de la finca" Id="Finca"/>
        <input id="Texto"></input>
        <Link to={`/${siguiente}/:`}> Siguiente</Link>
        </body>
    )
}