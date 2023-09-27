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
        const loteAnalisis = miLote.analysis
        mensaje+="\n\n*Análisis Físico*"
        mensaje+= loteAnalisis.factordeRendimiento?`\nFactor de rendimieto: ${miLote.analysis.factordeRendimiento}`:''
        mensaje+= loteAnalisis.pcMerma?`\nPorcentaje de merma: ${miLote.analysis.pcMerma}%`:''
        mensaje+='\nGranulometría:'
        const Mallas = [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]
        Mallas.forEach(malla=>{
            if(loteAnalisis.mallas[malla]){
                mensaje+='\nMalla '+malla+': '+loteAnalisis.mallas[malla].pcA+'%'
            }
        })
        mensaje+='\nDefectos Físicos:'
        miLote.analysis.defects.forEach((element)=>{
            mensaje+=`\n${element.defect.name}. `
            mensaje+=pDefectURL(element.defect.id)
        })
    }
    if(miLote.CUPPING){

    }
    return mensaje
}