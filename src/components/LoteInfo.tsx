import { useState } from "react";
import { CatacionLote, Lote, AnalisisFisico, EMPTY_CUPPING, EMPTY_ANALISIS } from "./MyTypes";

export function createLote ():Lote{
    const newLote:Lote={
        cupping:EMPTY_CUPPING,
        analysis: EMPTY_ANALISIS,
        ANALYSYS: false,
        CUPPING: false,
      }
      return newLote
}
export function createAnalisisFisico():AnalisisFisico {
    let newAnalisis: AnalisisFisico = {
        
        sampleWeight: 250,
        defects: [],
        defectsWeight: 0,
        excelso: 200,
        factordeRendimiento:100,
        group1DefectsWeight:0,
        group2DefectsWeight:0,
        mallas:{
        }
    }
    return newAnalisis
}
export function createCupping(myLote:Lote, newCatacion: CatacionLote):Lote{
    myLote.cupping = newCatacion;
    return myLote
}
export function LoteCodigo({miLote, handleCodigo}:{miLote:Lote, handleCodigo:(e:React.ChangeEvent<HTMLInputElement>)=>void}){
    return(
        <div className="searchdiv" style={{height:"25px"}}>
            <input onChange={e=>handleCodigo(e)}  autoCapitalize="characters"  placeholder="Código" type="text" id="InputCodigoLote" value={miLote?.codigo}></input>
            <button>Buscar</button>
        </div>
    )
}
export function LoteInfo ({miLote=createLote()}:{miLote:Lote}){
    const [InfoView, setInfoView] = useState(false)
    function handleInfoView (){
        setInfoView(!InfoView)
    }
    return (
        <div style={{margin: "5px"}}>
            <button style={{fontSize:"16px", borderRadius: "0.5em", padding:"3px"}} onClick={handleInfoView}>Info</button>
            <div className={InfoView? "InfoVisible":"InfoInvisible"}>
                <div className="InfoLote" style={{fontSize:"14px", display:"flex"}} id="catacionInfoLote">
                    <div className={miLote.nombreCaficultor?"InfoVisible":"InfoInvisible"}><p>Caficultor: {miLote?.nombreCaficultor}</p></div>
                    <div className={miLote.municipio?"InfoVisible":"InfoInvisible"}><p>Municipio: {miLote?.municipio}</p></div>
                    <div className={miLote.altura?"InfoVisible":"InfoInvisible"}><p>Altura: {miLote?.altura} msnm</p></div>
                    <div className={miLote.variedad?"InfoVisible":"InfoInvisible"}><p>Variedad: {miLote?.variedad}</p></div>
                    <div className={miLote.proceso?"InfoVisible":"InfoInvisible"}><p>Proceso: {miLote?.proceso}</p></div>
                </div>
            </div>
        </div>
    )
}