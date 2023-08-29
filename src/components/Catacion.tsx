import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components';
import CoffeeScoreInput from './CoffeeScoreInput';
import { CatacionLote, Lote, puntajeSCA, predefinedDefects, CupDefect } from './MyTypes';
import axios from 'axios';
// const twilio = require('twilio');
// import { TwilioClient } from "twilio-client";
// ... ESTILOS ......................

const PageContainer = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0px;
  font-family: Arial, sans-serif;
  padding: 0px;
  background-image: url('top-view-delicious-coffee-beans-arrangement.jpg');
  background-size: cover;
  background-attachment: fixed;
`;

const ScoreInputsContainer = styled.div`

  display: flex;
  flex-direction: row;
  max-width: inherit;
  
  /*@media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }*/
`;

const CatacionContainer = styled.div`
    background-color: rgb(255,255,255,0.5);
    display: flex;
    flex-direction: row;
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 10px;
    border-radius: 1rem;
    box-shadow: 3px 3px 5px rgb(50, 50, 50);
    width: inherit;
    overflow: auto;
    scrollbar-width: 5px;
`;

const CatacionHeader = styled.div`
  font-size: 16px;
  margin: 10px;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center !important;
`;
const SCABlock = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    height: fit-content;
    width: fit-content;
    min-width: 150px;
    min-height: 150px;
    max-width: 300px;
    max-height: 300px;
`;
const CatacionData = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* Alineación horizontal a la izquierda */
   align-items: flex-start; /* Alineación vertical en el centro */
  
`;

const CatacionScoreInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
  flex-direction: row !important;
`;
const AddCatacionButton = styled.button`
    display: none;
  margin-bottom: 20px;
  /* Other styles you want to apply */
`;
// TERMINAN ESTILOS ----------------------------------------------

export default function Catacion() {
    const location = useLocation();
    const { miLote }: { miLote: Lote } = location.state || {};
    const [catacionCount, setCatacionCount] = useState(1);
    const [reactLote, setReactLote] = useState<Lote>(miLote);
    const [catador, setCatador] = useState('');
    /* const falseSCAboxList: SCAboxList = [
            {index:1, value: false},
            {index:2, value: false},
            {index:3, value: false},
            {index:4, value: false},
            {index:5, value: false},
        ]
    */



    const MuestraInicial: CatacionLote = {
        id: 1,
        codigo: reactLote.codigo,
        InfoView: false,
        InfoClass: "InfoInvisible",
        variedad: reactLote.variedad,
        proceso: reactLote.proceso,
        altura: reactLote.altura,
    const muestraVacia: CatacionLote = {
        id: 0,
        dulzor: [
            { index: 1, value: true },
            { index: 2, value: true },
            { index: 3, value: true },
            { index: 4, value: true },
            { index: 5, value: true },
        ],
        uniformidad: [
            { index: 1, value: true },
            { index: 2, value: true },
            { index: 3, value: true },
            { index: 4, value: true },
            { index: 5, value: true },
        ],

        tazaLimpia: [
            { index: 1, value: true },
            { index: 2, value: true },
            { index: 3, value: true },
            { index: 4, value: true },
            { index: 5, value: true },
        ],
        defectsList: [],
        uniformidadScore: 10,
        dulzorScore: 10,
        tazaLimpiaScore:10,
        InfoView: false,
        InfoClass: "InfoInvisible",
        defectsQty: 0,
        SCAdefectsQty: 0,
        SCAdefects: 0,
        fragancia: 6,
        sabor: 6,
        residual: 6,
        acidez: 6,
        cuerpo: 6,
        balance: 6,
        puntajeCatador: 6,
        finalScore: 0,
        defectsIntesity: 2
    }
    const MuestraInicial:CatacionLote = {
        ...muestraVacia,
        id: 1,
        codigo: miLote.codigo,
        variedad: miLote.variedad,
        proceso: miLote.proceso,
        altura: miLote.altura,

    }
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([MuestraInicial]);
    const [defectValue, setDefectValue] = useState<CupDefect>({id:0, name:''});
    const handleCatador = (e:React.ChangeEvent<HTMLInputElement> ) => {
        setCatador(e.target.value)
    }
    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);
        const newCatacionElement: CatacionLote = {
            ...muestraVacia,
            id: newCatacionCount,
        };
        setCatacionElements(prevElements => [...prevElements, newCatacionElement]);
        //setReactLote({...reactLote, cu})
    };
    function handleCatacionProp(id: number, Propiedad: keyof CatacionLote, e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, [Propiedad]: newValue } : data
            )
        );
    }
    function handleInfoView(id: number) {
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, InfoView: !data.InfoView } : data
            )
        );

    }
    function handleFinalScore(id:number){
        setCatacionElements(elements => 
            elements.map(element =>{
                if (element.id===id) {
                    let newFinalScore:number = 
                    element.fragancia + 
                    element.sabor +
                    element.residual +
                    element.acidez +
                    element.cuerpo + 
                    element.uniformidadScore +
                    element.balance +
                    element.tazaLimpiaScore +
                    element.dulzorScore + 
                    element.puntajeCatador -
                    element.SCAdefects
                    return {...element, finalScore:newFinalScore}
                }
                else return element
            })
        )
    }
    const handleScoreChange = (
        id: number,
        aspect: keyof CatacionLote,
        value: number
    ) => {
        
        setCatacionElements(prevElements =>
            prevElements.map(element =>{
                handleFinalScore(element.id)
                if(element.id === id) return  { ...element, [aspect]: value}
                else return element
            })
        );
    }
    function handleAtributoChange (id:number, atributo: keyof CatacionLote, e:React.ChangeEvent<HTMLTextAreaElement>){
        setCatacionElements(prevElements =>
            prevElements.map(element =>{
                if(element.id === id) return  { ...element, [atributo]: e.target.value}
                else return element
            })
        );
    }
    const handleDefectsChange = (
        id: number,
        value: number
    ) => {
        setCatacionElements(prevElements => 
            prevElements.map(element =>{
                if(element.id===id){
                    let newDefects:number = element.SCAdefectsQty * value
                    return { ...element, defectsIntesity:value, SCAdefects: newDefects} 
                } 
                else return element
            })
        );
        handleFinalScore(id);
    }
    const handleUniformidadChange = (
        id: number,
        InputIndex: number
    ) => {
        let newScore: number = 0;
        //let newSCABoxList:SCAboxList
        catacionElements.forEach(catacionElement => {
            if (catacionElement.id === id) {
                let newSCABoxList = catacionElement.uniformidad
                newSCABoxList.forEach(box => {
                    box.value = box.index === InputIndex ? !box.value : box.value;
                    if (box.value) newScore += 2
                })
                setCatacionElements(prevData =>
                    prevData.map(data =>
                        data.id === id ? { ...data, uniformidad: newSCABoxList, uniformidadScore: newScore } : data
                    )
                );
            }
        })
        handleFinalScore(id);
            
    }
    const handleTazaLimpiaChange = (
        id: number,
        InputIndex: number
    ) => {
        let newScore:number = 0;
        let newDefectsQty:number = 0;
        //let newSCABoxList:SCAboxList
        catacionElements.forEach(catacionElement=>{
            if(catacionElement.id===id){
                let newSCABoxList=catacionElement.tazaLimpia
                newSCABoxList.forEach(box=>{
                    box.value =  box.index===InputIndex? !box.value: box.value;
                    if(box.value) newScore+=2
                    else newDefectsQty+=1
                })
                setCatacionElements(prevData =>
                    prevData.map(data =>
                        data.id === id ? { ...data, tazaLimpia: newSCABoxList, tazaLimpiaScore: newScore, SCAdefectsQty:newDefectsQty } : data
                    )
                );
                handleDefectsChange(catacionElement.id,catacionElement.defectsIntesity || 0)
                handleFinalScore(id);
            }
        })
    }
    function handleDulzorChange(id: number, InputIndex: number) {
        let newScore: number = 0;
        //let newSCABoxList:SCAboxList
        catacionElements.forEach(catacionElement => {
            if (catacionElement.id === id) {
                let newSCABoxList = catacionElement.dulzor
                newSCABoxList.forEach(box => {
                    box.value = box.index === InputIndex ? !box.value : box.value;
                    if (box.value) newScore += 2
                })
                setCatacionElements(prevData =>
                    prevData.map(data =>
                        data.id === id ? { ...data, dulzor: newSCABoxList, dulzorScore: newScore } : data
                    )
                );
            }
        })
        handleFinalScore(id);
    }
    function handleDefectValue(event: React.ChangeEvent<HTMLSelectElement>):void {
        const newName:string = event.target.value
        const newDefect: CupDefect = predefinedDefects.find((defect)=>defect.name===newName) || defectValue
        setDefectValue(newDefect)
    }
    function handleAddDefect(id:number){
        setCatacionElements(prevElements =>
            prevElements.map(element =>{
                if(element.id === id){
                    const added:boolean = element.defectsList.some(defect=>defect.name===defectValue.name)
                    if(!added){
                        const newDefectlist = element.defectsList.concat(defectValue)
                        return  { ...element, defectsList:newDefectlist }
                    }
                    else return element
                }
                else return element
            })
        );
    }
    function handleDeleteDefect(id:number, defectId:number){
        setCatacionElements(prevElement => 
            prevElement.map(element => {
                    if(element.id === id) {
                        const newDefectsList = element.defectsList.filter(defect=> defect.id!==defectId)
                        return  { ...element, defectsList:newDefectsList}
                    }
                    else return element
                }
            )
        )
    }

        // Valida los datos de la catazon
        if (!valoresCatacion.some((catacionElement) => {
            return catacionElement.dulzor || catacionElement.uniformidad || catacionElement.tazaLimpia || catacionElement.acidez || catacionElement.cuerpo || catacionElement.balance || catacionElement.complejidad;
        })) {
            throw new Error("El campo 'notas' no puede estar vacío");
        }
    
        // Envía los valores de la catazon a tu backend
        const response = await axios.post('/api/enviar-catacion', valoresCatacion);
    
        console.log(response.data);
    };
    

    const [valoresCatacion, setValoresCatacion] = useState<CatacionLote[]>(catacionElements);

    //handleNuevaCatacion();
    return (
        <div className="Image2Background" >
            <div>
                <div className="tableHeader">
                    <div className="field">
                        <div>

                            <h2 style={{ display: "inline" }}>Catador </h2>
                            <input type="text" onChange={(e) => handleCatador(e)}></input>
                        </div>
                    </div>
                </div>
                <div className="tableBody">
                    {catacionElements.map(catacionElement => (
                        <CatacionContainer key={catacionElement.id}>
                            <CatacionHeader>
                                <h2>Muestra {catacionElement.id}</h2><br />
                                <div className="searchdiv" style={{ height: "25px" }}>
                                    <input autoCapitalize="characters" placeholder="Código" type="text" id="InputCodigoLote" onChange={(event) => handleCatacionProp(catacionElement.id, "codigo", event)} value={catacionElement.codigo}></input>
                                    <button>Buscar</button>

                                </div>
                                <a style={{fontSize:"14px", color:"black", display:"block"}} href="/RegistroLote/Catacion" target="_blank"> Registrar Lote</a> <br/>
                                <button style={{fontSize:"16px", borderRadius: "0.5em", padding:"3px"}} onClick={e=>{handleInfoView(catacionElement.id)}}>Info</button>
                                <div className={catacionElement.InfoView? "InfoVisible":"InfoInvisible"}><br/>
                                    <p style={{fontSize:"14px"}} id="catacionInfoLote">
                                        Caficultor: {miLote.nombreCaficultor}<br/>
                                        Municipio: {miLote.municipio}<br/>
                                        Altura: {catacionElement?.altura} msnm<br/>
                                        Variedad: {catacionElement?.variedad}<br/>
                                        Proceso: {catacionElement.proceso}
                                    </p>
                                </div>
                            </CatacionHeader>
                            <CatacionData >
                                <div>Puntaje final: {catacionElement.finalScore}</div>
                                <ScoreInputsContainer>
                                    <SCABlock>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.fragancia}</h2>
                                            </div>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="Fragancia"
                                            score={catacionElement.fragancia || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "fragancia", value as puntajeSCA)
                                            }
                                        />
                                        <textarea className="atributosInput" placeholder="Fragancias" onChange={(e)=>handleAtributoChange(catacionElement.id,"fraganciaA",e)}/>
                                        <p>{catacionElement?.fraganciaA}</p>
                                        <CoffeeScoreInput
                                            aspect="Seco"
                                            score={catacionElement.seco || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "seco", value)
                                            }
                                        />
                                        <CoffeeScoreInput
                                            aspect="Mojado"
                                            score={catacionElement.mojado || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "mojado", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.sabor}</h2>
                                            </div>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="Sabor"
                                            score={catacionElement.sabor || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "sabor", value)
                                            }
                                        />
                                        
                                        <textarea className="atributosInput"  placeholder="Sabores"  onChange={(event)=>handleAtributoChange(catacionElement.id,"saborA",event)}/>
                                    </SCABlock>
                                    <SCABlock>
                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.residual}</h2>
                                            </div>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="Residual"
                                            score={catacionElement.residual || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "residual", value)
                                            }
                                        />
                                    <textarea className="atributosInput" placeholder="Atributos"  onChange={(e)=>handleAtributoChange(catacionElement.id,"residualA",e)}/>
                                    </SCABlock>
                                    <SCABlock>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.acidez}</h2>
                                            </div>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="Acidez"
                                            score={catacionElement.acidez || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "acidez", value)
                                            }
                                        />
                                        <textarea className="atributosInput"  placeholder="Atributos"  onChange={(e)=>handleAtributoChange(catacionElement.id,"acidezA",e)}/>
                                        <CoffeeScoreInput
                                            aspect="Intensidad"
                                            score={catacionElement.intensidad || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "intensidad", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.cuerpo}</h2>
                                            </div>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="cuerpo"
                                            score={catacionElement.cuerpo || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "cuerpo", value)
                                            }
                                        />
                                        <textarea className="atributosInput" placeholder="Atributos"  onChange={(e)=>handleAtributoChange(catacionElement.id,"cuerpoA",e)}/>
                                        <CoffeeScoreInput
                                            aspect="nivel"
                                            score={catacionElement.nivel || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "nivel", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <SCABlock>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <div className="SCAScore">
                                                    <h2>Total: {catacionElement.uniformidadScore}</h2>
                                                </div>
                                            </div>
                                            <div className="SCACheckBox">
                                                <h2 style={{ fontSize: "16px" }}>Uniformidad</h2>
                                                {catacionElement.uniformidad.map((scabox) => (
                                                    <input
                                                        type="checkbox"
                                                        checked={scabox.value}
                                                        onChange={() => {
                                                            handleUniformidadChange(catacionElement.id, scabox.index);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </SCABlock>
                                        <SCABlock>
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                <div className="SCAScore">
                                                    <h2>Total: {catacionElement.balance}</h2>
                                                </div>
                                            </div>
                                            <CoffeeScoreInput
                                                aspect="balance"
                                                score={catacionElement.balance || 8}
                                                onChange={(value) =>
                                                    handleScoreChange(catacionElement.id, "balance", value)
                                                }
                                            />
                                        </SCABlock>
                                    </SCABlock>
                                {/* Add more CoffeeScoreInput components for other attributes */}
                                
                                <SCABlock>
                                <SCABlock>
                                <div style={{display:"flex",justifyContent:"flex-end"}}>
                                    <div className="SCAScore">
                                        <h2>Total: {catacionElement.tazaLimpiaScore}</h2>
                                    </div>
                                </div>           
                                <div className="SCACheckBox">
                                    <h4>Tasa Limpia</h4>
                                    <div>
                                        {catacionElement.tazaLimpia.map((scabox) => (
                                                <input 
                                                    type="checkbox"
                                                    checked={scabox.value}
                                                    onChange={() => {
                                                        handleTazaLimpiaChange(catacionElement.id, scabox.index);
                                                    }}
                                                />
                                            ))}
                                    </div>
                                </div>
                                </SCABlock>
                                <SCABlock>
                                <div >
                                    <div style={{display:"flex",justifyContent:"flex-end"}}>
                                        <div className="SCAScore">
                                            <h2>Total: {catacionElement.dulzorScore}</h2>
                                        </div>
                                    </div>   
                                    <h4>Dulzor</h4>
                                    <div className="SCACheckBox">
                                    {catacionElement.dulzor.map((dscabox) => (
                                            <input 
                                                type="checkbox"
                                                checked={dscabox.value}
                                                onChange={() => {
                                                    handleDulzorChange(catacionElement.id, dscabox.index);
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                                </SCABlock>
                                </SCABlock>
                                <SCABlock>
                                    <SCABlock>
                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement.puntajeCatador}</h2>
                                            </div>
                                        </div>   
                                        <CoffeeScoreInput
                                            aspect="Puntaje Catador"
                                            score={catacionElement.puntajeCatador || 6}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "puntajeCatador", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <div style={{display:"flex",justifyContent:"flex-end"}}>
                                            <div className="SCAScore">
                                                <h2>Total: {catacionElement?.SCAdefects}</h2>
                                            </div>
                                        </div>
                                        <div style={{margin: "5px", display:"flex", flexDirection:"column"}}>
                                            <div>
                                                <h4>Defectos</h4>
                                            </div>
                                            <div>
                                                <h4>Ctd: {catacionElement.SCAdefectsQty}</h4>
                                                <h4>Intensidad: {catacionElement?.defectsIntesity}</h4>
                                                <button className="intensityButton" id="intensity2" onClick={()=>handleDefectsChange(catacionElement.id,  2)}>2</button>
                                                <button className="intensityButton" id="intensity4" onClick={()=>handleDefectsChange(catacionElement.id, 4)}>4</button>
                                            </div>
                                        </div>   
                                    </SCABlock>   
                                </SCABlock>
                                </ScoreInputsContainer>
                                <div style={{fontSize:"16px", background: "white"}} >
                                    <h3>Defectos</h3>
                                    <select value={defectValue.name} onChange={(e)=>handleDefectValue(e)}>
                                        <option value="">Seleccione una opción</option>
                                        {predefinedDefects.map((option) => (
                                        <option key={option.id} value={option.name}>
                                            {option.name}
                                        </option>
                                        ))}
                                    </select>
                                    <button onClick={()=>handleAddDefect(catacionElement.id)}>Agregar</button>
                                    <h1>{defectValue.id}{defectValue.name}</h1>
                                    {catacionElement.defectsList.map((row) => (
                                        <tr key={row.id}>
                                        <td>{row.name}</td>
                                        <td>
                                            <button onClick={() => handleDeleteDefect(catacionElement.id, row.id)}>Eliminar</button>
                                        </td>
                                        </tr>
                                    ))}
                                </div>
                            </CatacionData>
                        </CatacionContainer>
                    ))}
                    <AddCatacionButton onClick={handleNuevaCatacion}>
                        Agregar Catacion
                    </AddCatacionButton>
                </div>
            </div>
        </div>
                </div>
                <AddCatacionButton onClick={handleNuevaCatacion}>
                    Agregar Catacion
                </AddCatacionButton>
                <button onClick={() => handleEnviarCatacion()}>Enviar catazon</button>
            </div>
        </div>
    );



