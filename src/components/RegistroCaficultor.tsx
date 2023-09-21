import {Link, useParams } from "react-router-dom";
import InputTexto from "./InputTexto";

export default function RegistroCaficultor (){
    const {siguiente} = useParams();
    return(
        <body className="bodyCafi">
            <section className="mainRegisterCafi">
        <InputTexto nombre="Nombre de caficultor" Id = "NombreCaficultor"/>
        <InputTexto nombre="Nombre de la finca" Id = "Finca"/>
        <Link to={`/${siguiente}/:`}> Siguiente</Link>
        </section>
        </body>
    )
}