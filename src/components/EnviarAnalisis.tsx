import { useLocation } from "react-router-dom";
import { Lote } from "./MyTypes";
import { createLote } from "./LoteInfo";
import BarraNavegacion from "./BarraNavegacion";
import { useState } from "react";
import CrearMensaje from "./CrearMensaje";
function EnviarAnalisis(){
    const location = useLocation();
    const { miLote }: { miLote: Lote } = location.state || createLote();
    const [mensaje, setMensaje] = useState<string>(CrearMensaje(miLote))
    const mensaje2 = CrearMensaje(miLote)
    return(
        <div>
            <BarraNavegacion miLote={miLote}/>
            <h2>Caficultor: {miLote.nombreCaficultor}</h2>
            <h2>Whatsapp: {miLote.numeroCel}</h2>
        <p>{mensaje2}</p>
        </div>
    )
}

export default EnviarAnalisis