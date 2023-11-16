
import React from "react";
import {useLocation}  from "react-router-dom";
import {  useEffect, useState } from "react";
import { AnalisisFisico, Lote, Mallas, defectoFisico, predefinedPhysicalDefects, samplePhysicalDefect } from "./MyTypes";
import { LoteCodigo, LoteInfo, createAnalisisFisico, createLote } from "./LoteInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import BarraNavegacion from "./BarraNavegacion";

//import { Helmet } from './react-helmet';

//import AnalisisFisicoLote from "./AnalisisFisicoLote";
//(import '.../public/css/registerCaficultor.css';
//<AnalisisFisicoLote {...codigo:"w4e234"; variedad:Variedad; altura:1800; proceso:"Lavado"}/>

//CREA UN DIV CON LABEL E INPUT
function InputAnalisis({ propLote, inputLabel, inputValue, handleFcn, inputClass, p }: { propLote: keyof AnalisisFisico, inputLabel: string, inputValue: number | undefined, handleFcn: (e: React.ChangeEvent<HTMLInputElement>, prop?: keyof AnalisisFisico) => void, inputClass: string, p?: string }) {
    return (
        <div className={inputClass}>
            <label>{inputLabel}</label>
            <input type="number" value={inputValue} onChange={e => handleFcn(e, propLote)}></input>
            <div style={{height:"fit-content"}}><p>{p}</p></div>
        </div>
    )
}

type ValidClass = {
    //id:string;
    validClass: string;
    invalidClass: string;
    classStatus: string;
    valid: boolean;
}
type tipoValidDicc = { [key: string]: ValidClass }
const ValidDicc: tipoValidDicc = {
    "pesoDefecto": {
        validClass: "inputValid",
        invalidClass: "inputInvalid",
        classStatus: "inputValid",
        valid: true
    },
    "sampleWeight": {
        validClass: "inputValid",
        invalidClass: "inputInvalid",
        classStatus: "inputValid",
        valid: true
    },
    "excelso": {
        validClass: "inputValid",
        invalidClass: "inputInvalid",
        classStatus: "inputValid",
        valid: true
    },
    "trilla":{
        validClass: "inputValid",
        invalidClass: "inputInvalid",
        classStatus: "inputValid",
        valid: true
    }
}

// const inputsValidAnalisis:inputValidClass[] = [
//     {
//         //id:"pesoDefecto",
//         validClass:"inputValid",
//         invalidClass: "inputInvalid",
//         classStatus: "inputInvalid",
//     },
//     {
//         id:"pesoMuestra",
//         validClass:"inputValid",
//         invalidClass: "inputInvalid",
//         classStatus: "inputInvalid",
//     }
// ]


export default function AnalisisFisicoPage() {
    const location = useLocation()
    let { miLote }: { miLote: Lote } = location.state || createLote();
    const [reactLote, setReactLote] = useState(miLote) || createLote();
    const [newAnalisis, setNewAnalisis] = useState<AnalisisFisico>(miLote?.analysis || createAnalisisFisico())
    const [selectedDefect, setSelectedDefect] = useState<defectoFisico>({ id: 0, name: '', group: 1 })
    const [defectWeight, setDefectWeight] = useState(0.0)
    //const [inputsValid, setInputsValid] = useState<inputValidClass[]>(inputsValidAnalisis)
    const [validClass, setValidClass] = useState<tipoValidDicc>(ValidDicc)
    //const [mermaMedida, setMermaMedida] = useState<number>(0)
    const [mallas, setMallas] = useState<number[]>([18].concat(createMallas()))

    function handleValidation(id: string, valid: boolean): void {
        if (validClass[id]) {
            validClass[id].valid = valid
            validClass[id].classStatus = valid ? validClass[id].validClass : validClass[id].invalidClass
            setValidClass({...validClass})
        }
    }
    function createMallas() {
        const newMalla: number[] = [17, 16, 15, 14, 13, 12, 11, 10, 0].filter(malla => newAnalisis.mallas[malla])
        return newMalla
    }
    useEffect(() => {

        if (newAnalisis.sampleWeight > 0) handleValidation("sampleWeight", true)
        else handleValidation("sampleWeight", false)
        if (newAnalisis.trilla<=0 ||newAnalisis.trilla>=newAnalisis.sampleWeight )handleValidation("trilla",false)
        else handleValidation("trilla",true)
        if (newAnalisis.excelso <= 0 || newAnalisis.excelso>=newAnalisis.trilla) handleValidation("excelso", false)
        else handleValidation("excelso", true)
        
        
        
    }, [newAnalisis]);
    function handleCodigo(e: React.ChangeEvent<HTMLInputElement>) {
        setReactLote({ ...reactLote, codigo: e.target.value })
    }
    function handleSampleWeight(e: React.ChangeEvent<HTMLInputElement>){
        newAnalisis.sampleWeight=Number(e.target.value)
        calcularResultados()
    }
    function handleTrilla(e: React.ChangeEvent<HTMLInputElement>){
        newAnalisis.trilla=Number(e.target.value)
        calcularResultados()
    }
    function handleExcelso(e: React.ChangeEvent<HTMLInputElement>){
        newAnalisis.excelso=Number(e.target.value)
        calcularResultados()
    }
    function handleProp( e: React.ChangeEvent<HTMLInputElement>, prop?: keyof AnalisisFisico,) {
    
        if (prop) setNewAnalisis({ ...newAnalisis, [prop]: e.target.value })
       

        let newfactordeRendimiento: number = (newAnalisis.sampleWeight / newAnalisis.excelso) * 70
        newfactordeRendimiento = Number(newfactordeRendimiento.toFixed(1))

        const newMerma: number = newAnalisis.sampleWeight - newAnalisis.excelso
        if(newAnalisis.excelso && newAnalisis.volume){
            let newDensity = newAnalisis.excelso/newAnalisis.volume
            newDensity = parseFloat(newDensity.toFixed(3))
            newAnalisis.density = newDensity
        }
        let newpcMerma: number = newMerma / newAnalisis.sampleWeight * 100
        const newmallas=calcularMallas(newAnalisis.mallas)

        setNewAnalisis({ ...newAnalisis, factordeRendimiento: newfactordeRendimiento, Merma: newMerma, pcMerma: newpcMerma, mallas:newmallas})
      
    }
    function calcularResultados(){
        let newfactordeRendimiento: number = (newAnalisis.sampleWeight / newAnalisis.excelso) * 70
        newfactordeRendimiento = Number(newfactordeRendimiento.toFixed(1))
        if(newAnalisis.trilla){

            newAnalisis.Merma = (newAnalisis.sampleWeight - newAnalisis.trilla)
            newAnalisis.pcMerma = newAnalisis.Merma / newAnalisis.sampleWeight * 100
        }
        if(newAnalisis.excelso && newAnalisis.volume){
            let newDensity = newAnalisis.excelso/newAnalisis.volume
            newDensity = parseFloat(newDensity.toFixed(3))
            newAnalisis.density = newDensity
        }
        const newmallas=calcularMallas(newAnalisis.mallas)

        setNewAnalisis({ ...newAnalisis, factordeRendimiento: newfactordeRendimiento, mallas:newmallas})
      
    }
    function handleDefectValue(event: React.ChangeEvent<HTMLSelectElement>): void {
        const newName: string = event.target.value
        const newDefect: defectoFisico = predefinedPhysicalDefects.find((defecto) => defecto.name === newName) || selectedDefect
        const isDefect: boolean = newName !== '' && newName !== ' '
        if (isDefect) {
            setSelectedDefect(newDefect)
        }
    }
    function handleDefectWeight(e: React.ChangeEvent<HTMLInputElement>) {
        const newDefectWeight = e.target.valueAsNumber
        setDefectWeight(newDefectWeight)
    }

    function handleAddDefect(): void {
        const added: boolean = newAnalisis.defects?.some(defecto => defecto.defect.name === selectedDefect.name)
        const isDefect: boolean = selectedDefect.name !== '' && selectedDefect.name !== ' '
        if (defectWeight > 0) handleValidation("pesoDefecto", true)
        else handleValidation("pesoDefecto", false)
        if (!added && isDefect && validClass["pesoDefecto"].valid) {
            let newPorcentaje: number = defectWeight / newAnalisis.trilla * 100
            newPorcentaje=Number(newPorcentaje.toFixed(2))
            const newSamplePhysicalDefect: samplePhysicalDefect = { defect: selectedDefect, peso: defectWeight, porcentaje: newPorcentaje }
            const newDefectsList = newAnalisis.defects.concat(newSamplePhysicalDefect)
            let newDefectsWeight: number = 0
            let group_1: number = 0
            let group_2: number = 0
            newDefectsList.forEach(defect => {
                if (defect.defect.group === 1) group_1 += defect.peso
                if (defect.defect.group === 2) group_2 += defect.peso
                newDefectsWeight = newDefectsWeight + defect.peso
            })
            setNewAnalisis({ ...newAnalisis, defects: newDefectsList, defectsWeight: newDefectsWeight, group1DefectsWeight: group_1, group2DefectsWeight: group_2 })
        }
    }

    function handleDeleteDefect(id: number): void {
        const newDefectsList: samplePhysicalDefect[] = newAnalisis.defects.filter((sampleDefect) => {
            return sampleDefect.defect.id !== id
        })
        let newDefectsWeight: number = 0
        let group_1: number = 0
        let group_2: number = 0
        newDefectsList.forEach(defect => {
            if (defect.defect.group === 1) group_1 += defect.peso
            if (defect.defect.group === 2) group_2 += defect.peso
            newDefectsWeight = newDefectsWeight + defect.peso
        })
        setNewAnalisis({ ...newAnalisis, defects: newDefectsList, defectsWeight: newDefectsWeight, group1DefectsWeight: group_1, group2DefectsWeight: group_2 })
    }
    function calcularMallas(newMallas:Mallas):Mallas{
        let newWeightA:number=0
        mallas.forEach(malla => {
            if (newMallas[malla]) {
                newMallas[malla].pc = Number(newMallas[malla].weight / newAnalisis.excelso * 100)
                newMallas[malla].pc = parseFloat(newMallas[malla].pc.toFixed(2))
                newWeightA += newMallas[malla].weight
                newMallas[malla].weightA = newWeightA
                newMallas[malla].pcA = Number(newWeightA / newAnalisis.excelso * 100)
                newMallas[malla].pc = parseFloat(newMallas[malla].pc.toFixed(2))
                newMallas[malla].pcA = parseFloat(newMallas[malla].pcA.toFixed(2))
            }
        })
        return newMallas
    }
    function handleMallaWeight(e: React.ChangeEvent<HTMLInputElement>, numero: number) {
        let newMallas = newAnalisis.mallas
    
        const newWeight = Number(e.target.value)
        if (newMallas[numero]) {
            newMallas[numero].weight = newWeight
        }
        newMallas[numero] = { weight: newWeight, weightA: 0, pc: 0, pcA: 0 }
        newMallas=calcularMallas(newMallas)
        
        setNewAnalisis({ ...newAnalisis, mallas: newMallas })
    }
    // function TabladeDefectos (){
    //     return(

    //     )
    // }
    function handleSaveAnalysis(){
        setReactLote({...reactLote, analysis:newAnalisis, ANALYSYS:true})
    }
    return (
        <div className="analisisBackground">
            <BarraNavegacion miLote={reactLote}/>
            <div className="container-analisisf">
                <div className="LoteHeader">
                    <LoteCodigo miLote={reactLote} handleCodigo={handleCodigo} />
                    <LoteInfo miLote={reactLote} />
                </div>
                <div id="AnalisisBody">
                    <section id="InputsAnalisis" className="">
                        <div className="row">
                            <div className="col-3">
                                <InputAnalisis
                                    inputLabel="Peso de la muestra [g]:  "
                                    inputValue={newAnalisis?.sampleWeight}
                                    propLote={"sampleWeight"}
                                    handleFcn={handleSampleWeight}
                                    inputClass={validClass["sampleWeight"].classStatus}
                                    p="El peso de la muestra debe ser mayor a cero (250g por defecto)"
                                />
                                
                            </div>
                            <div className="col-3">
                                <InputAnalisis
                                    propLote={"trilla"}
                                    inputValue={newAnalisis?.trilla}
                                    handleFcn={handleTrilla}
                                    inputLabel="Trilla [g]:  "
                                    inputClass={validClass["trilla"].classStatus}
                                    p="El peso debe ser mayor a cero y menor al peso de la muestra"
                                />
                            </div>
                            <div className="col-3">
                                <InputAnalisis
                                    propLote={"excelso"}
                                    inputValue={newAnalisis?.excelso}
                                    handleFcn={handleExcelso}
                                    inputLabel="Excelso [g]:  "
                                    inputClass={validClass["excelso"].classStatus}
                                    p="El peso debe ser mayor a cero y menor al peso de trilla"
                                />
                            </div>
                            
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <InputAnalisis
                                    propLote={"humidity"}
                                    inputValue={newAnalisis?.humidity}
                                    handleFcn={handleProp}
                                    inputLabel="Humedad [%]:  "
                                    inputClass="InputAnalisis"
                                />
                            </div>
                            <div className="col-3">
                                <InputAnalisis
                                    propLote={"volume"}
                                    inputValue={newAnalisis?.volume}
                                    handleFcn={handleProp}
                                    inputLabel="Volumen [ml]:  "
                                    inputClass="InputAnalisis"
                                />
                            </div>
                            <div className="col-3">
                                <InputAnalisis
                                    propLote={"aw"}
                                    inputValue={newAnalisis?.aw}
                                    handleFcn={handleProp}
                                    inputLabel="Actvidad de agua:  "
                                    inputClass="InputAnalisis"
                                />
                            </div>
                        </div>
                    </section>
                    <section id="Defectos" className="field">
                        <h1>Defectos</h1>
                        <a target="_blanck" 
                        href="https://federaciondecafeteros.org/app/uploads/2019/11/Afiche-Español-2-final.pdf"
                        >Mira los defectos físicos</a>
                        <div className="input-row">
                            <div className="InputAnalisis">
                                <label htmlFor="defectSelect" >Defectos:</label>
                                <select
                                    style={{fontSize:"16px"}}
                                    id="defectSelect"
                                    value={selectedDefect.name}
                                    onChange={(e) => handleDefectValue(e)}
                                >
                                    <option value="">Seleccione un defecto</option>
                                    {predefinedPhysicalDefects.map((defecto) => (
                                        <option key={defecto.id}>{defecto.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className={validClass["pesoDefecto"].classStatus}>
                                <label htmlFor="pesoDefecto">Peso [g]:</label>
                                <input
                                    min="0"
                                    className={validClass["pesoDefecto"].classStatus}
                                    step={0.1}
                                    type="number"
                                    id="pesoDefecto"
                                    value={defectWeight}
                                    onChange={(e) => handleDefectWeight(e)}
                                /> 
                                <p >El peso debe ser mayor a cero</p>
                                
                            </div>
                            <button onClick={handleAddDefect} className="agg">
                                <FontAwesomeIcon icon={faPlusCircle} />
                            </button>
                        </div>
                        <table style={{ border: "1px solid black" }}>
                            {newAnalisis.defects?.map((defecto) => (
                                <tr key={defecto.defect.id}>
                                    <td>{defecto.defect.name}</td>
                                    <td>Grupo: {defecto.defect.group}</td>
                                    <td>{defecto.peso} g</td>
                                    <td>{defecto.porcentaje} %</td>
                                    <button style={{margin:"5px"}} onClick={() => handleDeleteDefect(defecto.defect.id)}><FontAwesomeIcon icon={faTrashAlt}/> </button>
                                </tr>
                            ))}
                        </table>
                    </section>
                    <div id="granulometria" className="field">
                        <h1>Granulometría</h1>
                        <table>
                            <thead>
                                <td>Malla</td>
                                <td>Retención [g]</td>
                                <td>Porcentaje</td>
                                <td>Retención acumulada</td>
                            </thead>
                            {mallas.map(numero => (
                                <tr>
                                    <td>{numero}</td>
                                    <td><div className="InputAnalisis"><input type="number" onChange={(e) => handleMallaWeight(e, numero)} value={newAnalisis.mallas[numero]?.weight} /></div></td>
                                    <td style={{width: 'fit-content'}}>{newAnalisis.mallas[numero]?.pc}%</td>
                                    <td style={{width: 'fit-content'}}>{newAnalisis.mallas[numero]?.pcA}%</td>
                                </tr>
                            ))}
                        </table>
                        <br /><button className="agg" onClick={() => setMallas(mallas.concat(Number(mallas.slice(-1)) - 1))}>Agregar malla</button>
                    </div>
                    <div className="resultados">
                        <h1 style={{fontSize:"25px", color:"black"}} >Resultados:</h1><br />
                        <a target="_blanck"  href="https://federaciondecafeteros.org/app/uploads/2019/10/precio_cafe.pdf">
                            Precio del día
                        </a>
                        <h4>Factor de rendimiento: {newAnalisis.factordeRendimiento}</h4>
                        <h4>Merma: {newAnalisis.pcMerma}% ({newAnalisis.Merma}g) </h4>
                        <h4>Peso defectos: {newAnalisis.defectsWeight} g</h4>
                        <h4 style={{fontSize: "14px"}}>Grupo 1: {newAnalisis.group1DefectsWeight} g</h4>
                        <h4 style={{fontSize: "14px"}}>Grupo 2: {newAnalisis.group2DefectsWeight} g</h4>
                        <h4 className={newAnalisis.density?"InfoVisible":"InfoInvisible"}>Densidad: {newAnalisis?.density} g/ml</h4>
                    
                    <button onClick={handleSaveAnalysis}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}