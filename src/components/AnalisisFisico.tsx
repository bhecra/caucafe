//import { useState } from "react";
import { useLocation, } from "react-router-dom";
import { HTMLInputTypeAttribute, useState } from "react";
import { AnalisisFisico, Lote, defectoFisico, predefinedPhysicalDefects, samplePhysicalDefect } from "./MyTypes";
import {LoteCodigo, LoteInfo} from "./LoteInfo";
//import AnalisisFisicoLote from "./AnalisisFisicoLote";
//(import '.../public/css/registerCaficultor.css';
//<AnalisisFisicoLote {...codigo:"w4e234"; variedad:Variedad; altura:1800; proceso:"Lavado"}/>
function createAnalisisFisico():AnalisisFisico {
    let newAnalisis: AnalisisFisico = {
        sampleWeight: 1,
        defects: [],
    }
    return newAnalisis
}
function InputAnalisis ({propLote,inputLabel,inputValue,handleFcn}: {propLote:keyof AnalisisFisico, inputLabel:string, inputValue:number | undefined, handleFcn:(prop: keyof AnalisisFisico,  e:React.ChangeEvent<HTMLInputElement>)=>void}){
    return(
        <div className="InputAnalisis ">
            <label>{inputLabel}</label>
            <input className="LoteInput" type="number" onChange={e=>handleFcn(propLote, e)} value={inputValue}></input>
        </div> 
    )
}

export default function AnalisisFisicoPage ()  {
    const location= useLocation()
    const { miLote}:{miLote:Lote} = location.state || {};
    const [reactLote, setReactLote] = useState(miLote);
    const [newAnalisis, setNewAnalisis] = useState<AnalisisFisico>({sampleWeight: 1,defects: []})
    const [selectedDefect, setSelectedDefect] = useState<defectoFisico>({id:0, name:'', group:1})
    const [defectWeight, setDefectWeight] = useState(0)
    
    function handleCodigo(e:React.ChangeEvent<HTMLInputElement>){
        setReactLote({...miLote, codigo:e.target.value})
    }
    function handleProp(prop: keyof AnalisisFisico, e:React.ChangeEvent<HTMLInputElement>){
        
        setNewAnalisis({...newAnalisis, [prop]: e.target.value})
    }
    
    function TabladeDefectos (){
        
        function handleDefectValue(event: React.ChangeEvent<HTMLSelectElement>):void {
            const newName:string = event.target.value
            const newDefect: defectoFisico = predefinedPhysicalDefects.find((defecto)=>defecto.name===newName) || selectedDefect
            setSelectedDefect(newDefect)
        }
        function handleDefectWeight (e:React.ChangeEvent<HTMLInputElement>){
            const newDefectWeight = e.target.valueAsNumber
            setDefectWeight(newDefectWeight)
        }
        function handleAddDefect():void{
            const added:boolean = newAnalisis.defects?.some(defecto=>defecto.defect.name===selectedDefect.name)
            if(!added) {
                const newPorcentaje:number = defectWeight/newAnalisis?.sampleWeight*100
                const newSamplePhysicalDefect:samplePhysicalDefect = {defect:selectedDefect, peso:defectWeight, porcentaje:newPorcentaje}
                console.log(newSamplePhysicalDefect)
                const newDefectsList= newAnalisis.defects.concat(newSamplePhysicalDefect)
                console.log(newDefectsList)
                setNewAnalisis({...newAnalisis, defects:newDefectsList})
            }
            else console.log("Defecto añadido")
        }
        return(
            <div className="InputAnalisis">
                <h1>Defectos</h1>
                <select value={selectedDefect.name} onChange={(e)=>handleDefectValue(e)}>
                    <option value="">Seleccione un defecto</option>
                    {predefinedPhysicalDefects.map(defecto=>(
                        <option key={defecto.id}>
                            {defecto.name}
                        </option>
                    ))}
                </select>
                <label>Peso [g]:</label>
                <input  type="number" value={defectWeight} onChange={(e)=>handleDefectWeight(e)}></input>
                <button onClick={handleAddDefect} >Agregar</button>
                <h2>{selectedDefect.name} id: {selectedDefect.id} w {defectWeight} g: {selectedDefect.group}</h2>
                {newAnalisis.defects?.map((defecto)=>(
                    <tr key={defecto.defect.id}>
                        <td>{defecto.defect.name}</td>
                        <td>{defecto.peso} g</td>
                        <td>{defecto.porcentaje} %</td>
                    </tr>
                ))}
            </div>
        )
    }
    return(
        <div>
            <div className="LoteHeader">
                <LoteCodigo miLote={reactLote} handleCodigo={handleCodigo}/>
                <LoteInfo miLote={reactLote}/>
            </div>
            <div>
                <InputAnalisis
                    inputValue={newAnalisis?.sampleWeight}
                    propLote={"sampleWeight"}
                    handleFcn={handleProp}
                    inputLabel="Peso de la muestra [g]:  "
                />
                <InputAnalisis 
                    propLote={"volume"} 
                    inputValue={newAnalisis?.volume} 
                    handleFcn={handleProp}
                    inputLabel="Volumen [ml]:  "
                />
                <InputAnalisis 
                    inputValue={newAnalisis?.humidity} 
                    propLote={"humidity"} 
                    handleFcn={handleProp}
                    inputLabel="Humedad [%]:  "
                />
                <InputAnalisis 
                    inputValue={newAnalisis?.aw} 
                    propLote={"aw"} 
                    handleFcn={handleProp}
                    inputLabel="Actvidad de agua:  "
                />
                <TabladeDefectos/>
            </div>
        </div>
    )
}