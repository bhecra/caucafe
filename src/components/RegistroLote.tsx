import {Link, useParams } from "react-router-dom";
import InputTexto from "./InputTexto";
//import { useState } from "react";

export default function RegistroLote () {
    const {siguiente} = useParams();

    //const [nombreCaficultor, setNombreCaficultor] = useState('')

    const NuevoLote = {

    }
    return(
        <body>
        <InputTexto nombre="Nombre de caficultor" Id="NombreCaficultor"/>
        <InputTexto nombre="Nombre de la finca" Id="Finca"/>
        <button>Generar código</button>
        <Link to={`/${siguiente}`}> Siguiente</Link>
        </body>
    )
}