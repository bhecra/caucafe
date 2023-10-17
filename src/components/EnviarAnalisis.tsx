import React from "react";
import { useLocation } from "react-router-dom";
import { Lote } from "./MyTypes";
import { createLote } from "./LoteInfo";
import BarraNavegacion from "./BarraNavegacion";
import CrearMensaje from "./CrearMensaje";
//import { Client as ConversationsClient } from "@twilio/conversations"; 

function EnviarAnalisis(){
    const location = useLocation();
    const { miLote }: { miLote: Lote } = location.state || createLote();
    //const [mensaje, setMensaje] = useState<string>(CrearMensaje(miLote))

    const mensaje2 = CrearMensaje(miLote)
    return(
        <div>
            <BarraNavegacion miLote={miLote}/>
            <div>
                <h2>Caficultor: {miLote.nombreCaficultor}</h2>
                <h2>Whatsapp: {miLote.numeroCel}</h2>
                <div className="mensajeWpp">
                    <p style={{wordWrap:"break-word"}}>{mensaje2}</p>
                </div>
                <button>Enviar</button>
            </div>
        </div>
    )
}

export default EnviarAnalisis