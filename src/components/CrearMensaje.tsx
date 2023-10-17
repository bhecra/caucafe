import { cDefectURL, pDefectURL } from "./DefectURL";
import { AnalisisFisico, CatacionLote, Lote } from "./MyTypes";

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
        mensaje+="\n\n*ANÁLISIS FÍSICO*"
        mensaje+=CrearResumenAnalisisFisico(miLote.analysis)
    }
    if(miLote.CUPPING){
        mensaje+='\n\n*CATACIÓN*'
        mensaje+=CrearResumenCatacion(miLote.cupping)
    }
    return mensaje
}

export function CrearResumenAnalisisFisico(loteAnalisis:AnalisisFisico):string{
    let mensaje=''
    mensaje+= loteAnalisis.factordeRendimiento?`\nFactor de rendimieto: ${loteAnalisis.factordeRendimiento}`:''
    mensaje+= loteAnalisis.pcMerma?`\nPorcentaje de merma: ${loteAnalisis.pcMerma}%`:''
    mensaje+='\n\nGranulometría:'
    const Mallas = [18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0]
    Mallas.forEach(malla=>{
        if(loteAnalisis.mallas[malla]){
            mensaje+='\nMalla '+malla+': '+loteAnalisis.mallas[malla].pcA+'%'
        }
    })
    mensaje+='\n\nDefectos Físicos:'
    loteAnalisis.defects.forEach((element)=>{
        mensaje+=`\n${element.defect.name}:   ${element.porcentaje}%`
        if(element.porcentaje>5) mensaje+=pDefectURL(element.defect.id)
    })
    return mensaje
}

export function CrearResumenCatacion (catacion:CatacionLote):string{
    let mensaje=''
    /*
    Fragancia: Chocolate, frutal
    Aroma:
    Sabor:
    Acidez: 
    Cuerpo:

    Defectos físicos:
    Moho. ¿Cómo corregirlo?: 

    Puntaje SCA:
    */
    if (catacion.fraganciaA) mensaje+=`\n\nFragrancia: ${catacion.fraganciaA}`
    if (catacion.saborA) mensaje+=`\nSabor: ${catacion.saborA}`
    if (catacion.acidezA) mensaje+=`\nSabor: ${catacion.acidezA}`
    if (catacion.cuerpoA) mensaje+=`\nCuerpo: ${catacion.cuerpoA}`
    if (catacion.residualA) mensaje+=`\nResidual: ${catacion.residualA}`

    if(catacion.defectsList.length>0){
        mensaje+='\n\nDefectos en taza:'
        catacion.defectsList.forEach(defect=>{
            mensaje+='\n'+defect.name + cDefectURL(defect.id)
        })
    }
    if (catacion.finalScore) mensaje+=`\n\nPuntaje SCA: ${catacion.finalScore}`
    

    return mensaje
}