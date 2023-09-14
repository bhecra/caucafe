import { useState } from "react";
import { CatacionLote, Lote, AnalisisFisico } from "./MyTypes";
export function HandleLote(){
    
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
            <input onChange={e=>handleCodigo(e)}  autoCapitalize="characters"  placeholder="Código" type="text" id="InputCodigoLote" value={miLote.codigo}></input>
            <button>Buscar</button>
        </div>
    )
}
export function LoteInfo ({miLote}:{miLote:Lote}){
    const [InfoView, setInfoView] = useState(false)
    function handleInfoView (){
        setInfoView(!InfoView)
    }
    return (
        <div>
            <button style={{fontSize:"16px", borderRadius: "0.5em", padding:"3px"}} onClick={handleInfoView}>Info</button>
            <div className={InfoView? "InfoVisible":"InfoInvisible"}><br/>
                <p style={{fontSize:"14px"}} id="catacionInfoLote">
                    Caficultor: {miLote.nombreCaficultor}<br/>
                    Municipio: {miLote.municipio}<br/>
                    Altura: {miLote?.altura} msnm<br/>
                    Variedad: {miLote?.variedad}<br/>
                    Proceso: {miLote.proceso}
                </p>
            </div>
        </div>
    )
}