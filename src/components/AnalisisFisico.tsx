//import { useState } from "react";
import { Link, useLocation, } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnalisisFisico, Lote, defectoFisico, predefinedPhysicalDefects, samplePhysicalDefect } from "./MyTypes";
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
function InputAnalisis({ propLote, inputLabel, inputValue, handleFcn, inputClass, p }: { propLote: keyof AnalisisFisico, inputLabel: string, inputValue: number | undefined, handleFcn: (prop: keyof AnalisisFisico, e: React.ChangeEvent<HTMLInputElement>) => void, inputClass: string, p?: string }) {
    return (
        <div className={inputClass}>
            <label>{inputLabel}</label>
            <input type="number" onChange={e => handleFcn(propLote, e)} value={inputValue} min={"0"}></input>
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
    const [mermaMedida, setMermaMedida] = useState<number>(0)
    const [mallas, setMallas] = useState<number[]>([18].concat(createMallas()))
    function handleValidation(id: string, valid: boolean): void {
        if (validClass[id]) {
            validClass[id].valid = valid
            console.log(id)
            console.log(validClass[id].valid)
            validClass[id].classStatus = valid ? validClass[id].validClass : validClass[id].invalidClass
            setValidClass({ ...validClass })
            console.log(validClass[id].classStatus)
        }
    }
    function createMallas() {
        const newMalla: number[] = [17, 16, 15, 14, 13, 12, 11, 10, 0].filter(malla => newAnalisis.mallas[malla])
        return newMalla
    }
    useEffect(() => {
        if (newAnalisis.sampleWeight > 0) handleValidation("sampleWeight", true)
        else handleValidation("sampleWeight", false)
        if (newAnalisis.excelso > 0) handleValidation("excelso", true)
        else handleValidation("excelso", false)
        let A: number = newAnalisis.defectsWeight ? newAnalisis.defectsWeight : 0
        let B: number = newAnalisis.trilla ? newAnalisis.trilla : 0
        //reactLote.analysis=newAnalisis
        setReactLote({...reactLote, analysis:newAnalisis})
        setMermaMedida(Number(A) + Number(B))
    }, [newAnalisis]);
    function handleCodigo(e: React.ChangeEvent<HTMLInputElement>) {
        setReactLote({ ...reactLote, codigo: e.target.value })
    }
    function handleProp(prop: keyof AnalisisFisico, e: React.ChangeEvent<HTMLInputElement>) {
        let newAnalisis2 = { ...newAnalisis, [prop]: e.target.value };
        let newfactordeRendimiento: number = (newAnalisis2.sampleWeight / newAnalisis2.excelso) * 70
        newfactordeRendimiento = Number(newfactordeRendimiento.toFixed(1))
        const newMerma: number = newAnalisis2.sampleWeight - newAnalisis2.excelso
        if(newAnalisis2.excelso && newAnalisis2.volume){
            let newDensity = newAnalisis2.excelso/newAnalisis2.volume
            newDensity = parseFloat(newDensity.toFixed(3))
            newAnalisis2.density = newDensity
        } 
        let newpcMerma: number = newMerma / newAnalisis2.sampleWeight * 100
        newpcMerma = parseFloat(newpcMerma.toFixed(2))
        setNewAnalisis({ ...newAnalisis2, factordeRendimiento: newfactordeRendimiento, Merma: newMerma, pcMerma: newpcMerma})
        
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
            const newPorcentaje: number = defectWeight / newAnalisis?.sampleWeight * 100
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
    function endAnalysis(): void {
        setReactLote({...reactLote, analysis:newAnalisis})
    }
    function handleMallaWeight(e: React.ChangeEvent<HTMLInputElement>, numero: number) {
        let newMallas = newAnalisis.mallas
        let newWeightA: number = 0
        const newWeight = Number(e.target.value)
        if (newMallas[numero]) {
            newMallas[numero].weight = newWeight
        }
        newMallas[numero] = { weight: newWeight, weightA: 0, pc: 0, pcA: 0 }

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
        setNewAnalisis({ ...newAnalisis, mallas: newMallas })
    }
    // function TabladeDefectos (){
    //     return(

    //     )
    // }
    return (
        <div className="container-analisisf">
            <BarraNavegacion miLote={reactLote}/>
            <div className="LoteHeader">
                <LoteCodigo miLote={reactLote} handleCodigo={handleCodigo} />
                <LoteInfo miLote={reactLote} />
            </div>
            <div id="AnalisisBody">
                <section id="InputsAnalisis" className="">
                    <div className="row">
                        <div className="col-3">
                            <InputAnalisis
                                inputValue={newAnalisis?.sampleWeight}
                                propLote={"sampleWeight"}
                                handleFcn={handleProp}
                                inputLabel="Peso de la muestra [g]:  "
                                inputClass={validClass["sampleWeight"].classStatus}
                                p="El peso de la muestra debe ser mayor a cero (250g por defecto)"
                            />
                        </div>
                        <div className="col-3">
                            <InputAnalisis
                                propLote={"excelso"}
                                inputValue={newAnalisis?.excelso}
                                handleFcn={handleProp}
                                inputLabel="Excelso [g]:  "
                                inputClass={validClass["excelso"].classStatus}
                                p="El peso debe ser mayor a cero"
                            />
                        </div>
                        <div className="col-3">
                            <InputAnalisis
                                propLote={"trilla"}
                                inputValue={newAnalisis?.trilla}
                                handleFcn={handleProp}
                                inputLabel="Trilla [g]:  "
                                inputClass="InputAnalisis"
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
                <section id="Defectos" className="inputs-analisis">
                    <h1>Defectos</h1>
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
                <div id="granulometria" className="inputs-analisis">
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
                    <h4>Factor de rendimiento: {newAnalisis.factordeRendimiento}</h4>
                    <h4>Porcentaje de Merma: {newAnalisis.pcMerma}%</h4>
                    <h4 className={newAnalisis.density?"InfoVisible":"InfoInvisible"}>Densidad: {newAnalisis?.density} g/ml</h4>
                    <h4>Peso defectos: {newAnalisis.defectsWeight} g</h4>
                    <h4 style={{fontSize: "14px"}}>Grupo 1: {newAnalisis.group1DefectsWeight} g</h4>
                    <h4 style={{fontSize: "14px"}}>Grupo 2: {newAnalisis.group2DefectsWeight} g</h4>
                    <h4>Merma calculada: {newAnalisis.Merma} gramos</h4>
                    <h4>Merma medida: {mermaMedida} gramos</h4>
                </div>
                <div className="last-buttons">
                    <button onClick={endAnalysis}>Guardar</button>
                    <button>
                        <Link to={'/Catacion'}
                            state={{
                                miLote: miLote
                            }} > Catación </Link>
                    </button>
                </div>
            </div>
        </div>

    )
}