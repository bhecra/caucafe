import { Lote } from "./MyTypes";

export default function CrearMensaje(miLote:Lote):string{
    let mensaje = 'Mensaje: '
    if(miLote.nombreCaficultor) mensaje+= `Señor/a ${miLote?.nombreCaficultor}`
    if(miLote.ANALYSYS){
        
    }

    return mensaje
}