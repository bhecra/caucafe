import { pDefectURL } from "./DefectURL";
import { Lote } from "./MyTypes";

export default function CrearMensaje(miLote:Lote):string{
    let mensaje = ''
    if(miLote.nombreCaficultor) mensaje+= `Señor/a ${miLote?.nombreCaficultor}. `
    mensaje+='Su lote'
    mensaje+= miLote.codigo?` con código ${miLote.codigo}`:''
    mensaje+= miLote.peso?` de ${miLote.peso}Kg`:''
    mensaje+=' de café '
    mensaje+= miLote.variedad?` de variedad ${miLote.variedad}`:''
    mensaje+=' fue analizado y los resultado son:'
    if(miLote.ANALYSYS){
        mensaje+="\n\n*Análisis Físico*"
        mensaje+= miLote.analysis.factordeRendimiento?`\nFactor de rendimieto: ${miLote.analysis.factordeRendimiento}`:''
        mensaje+= miLote.analysis.pcMerma?`\nPorcentaje de merma: ${miLote.analysis.pcMerma}%`:''
        mensaje+='\nDefectos Físicos:'
        miLote.analysis.defects.forEach((element)=>{
            mensaje+=`\n${element.defect.name}. ¿Cómo corregir este defecto?:`
            mensaje+=pDefectURL(element.defect.id)
        })
    }
    if(miLote.CUPPING){

    }
    return mensaje
}