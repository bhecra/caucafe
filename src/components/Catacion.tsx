import { useLocation} from "react-router-dom";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CoffeeScoreInput from './CoffeeScoreInput';
import { CatacionLote, Lote, puntajeSCA, predefinedDefects, CupDefect, EMPTY_CUPPING } from './MyTypes';
import { LoteCodigo, LoteInfo, createLote } from "./LoteInfo";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

// ... ESTILOS ......................
//@ts-ignore
import { Helmet } from 'react-helmet';
import BarraNavegacion from "./BarraNavegacion";


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
    background-color: #ffffff8e;
    display: flex;
    flex-direction: row;
    margin-top: 2%;
    margin-bottom: 2%;
    padding: 10px;
    border-radius: 1rem;
    box-shadow: 3px 3px 5px rgb(50, 50, 50, 0.5);
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


const AddCatacionButton = styled.button`
    
  margin-bottom: 20px;
  /* Other styles you want to apply */
`;
// TERMINAN ESTILOS ----------------------------------------------
export default function Catacion() {
    const LoteVacio:Lote = createLote()
    const location = useLocation();
    const { miLote }: { miLote: Lote } = location.state || createLote();
    const [catacionCount, setCatacionCount] = useState(0);
    const [reactLote, setReactLote] = useState<Lote[]>([{...miLote?miLote:LoteVacio}]);
    const [catador, setCatador] = useState('');
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([miLote?.cupping||EMPTY_CUPPING ]);
    const [defectValue, setDefectValue] = useState<CupDefect>({ id: 0, name: '' });
    useEffect(()=>{
       reactLote[0].cupping = catacionElements[0]
       reactLote[0].CUPPING=true
       setReactLote(reactLote)
    },[catacionElements])
    const handleCatador = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newCatador= e.target.value
        setCatador(newCatador)
        setCatacionElements(prevData =>
            prevData.map(data => {return{ ...data, catador:newCatador}}
            )
        );
    }
    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);
        const newCatacionElement: CatacionLote = {
            ...EMPTY_CUPPING,
            id: newCatacionCount,
        };
        const newLote = createLote()
        setReactLote(prevElements=>[...prevElements,newLote])
        setCatacionElements(prevElements => [...prevElements, newCatacionElement]);
        //setReactLote({...reactLote, cu})
    }
    /*
    function handleCatacionProp(id: number, Propiedad: keyof CatacionLote, e: React.ChangeEvent<HTMLInputElement>) {
        const newValue = e.target.value
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, [Propiedad]: newValue } : data
            )
        );
    }
    */

    function handleFinalScore(id: number) {
        setCatacionElements(elements =>
            elements.map(element => {
                if (element.id === id) {
                    let newFinalScore: number =
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
                    return { ...element, finalScore: newFinalScore }
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
            prevElements.map(element => {
                handleFinalScore(element.id)
                if (element.id === id) return { ...element, [aspect]: value }
                else return element
            })
        );
    }
    function handleAtributoChange(id: number, atributo: keyof CatacionLote, e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCatacionElements(prevElements =>
            prevElements.map(element => {
                if (element.id === id) return { ...element, [atributo]: e.target.value }
                else return element
            })
        );
    }
    const handleDefectsChange = (
        id: number,
        value: number
    ) => {
        setCatacionElements(prevElements =>
            prevElements.map(element => {
                if (element.id === id) {
                    let newDefects: number = element.SCAdefectsQty * value
                    return { ...element, defectsIntesity: value, SCAdefects: newDefects }
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
        let newScore: number = 0;
        let newDefectsQty: number = 0;
        //let newSCABoxList:SCAboxList
        catacionElements.forEach(catacionElement => {
            if (catacionElement.id === id) {
                let newSCABoxList = catacionElement.tazaLimpia
                newSCABoxList.forEach(box => {
                    box.value = box.index === InputIndex ? !box.value : box.value;
                    if (box.value) newScore += 2
                    else newDefectsQty += 1
                })
                setCatacionElements(prevData =>
                    prevData.map(data =>
                        data.id === id ? { ...data, tazaLimpia: newSCABoxList, tazaLimpiaScore: newScore, SCAdefectsQty: newDefectsQty } : data
                    )
                );
                handleDefectsChange(catacionElement.id, catacionElement.defectsIntesity || 0)
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
    function handleDefectValue(event: React.ChangeEvent<HTMLSelectElement>): void {
        const newName: string = event.target.value
        const newDefect: CupDefect = predefinedDefects.find((defect) => defect.name === newName) || defectValue
        setDefectValue(newDefect)
    }
    function handleAddDefect(id: number) {
        setCatacionElements(prevElements =>
            prevElements.map(element => {
                if (element.id === id) {
                    const added: boolean = element.defectsList.some(defect => defect.name === defectValue.name)
                    if (!added) {
                        const newDefectlist = element.defectsList.concat(defectValue)
                        return { ...element, defectsList: newDefectlist }
                    }
                    else return element
                }
                else return element
            })
        );
    }
    function handleDeleteDefect(id: number, defectId: number) {
        setCatacionElements(prevElement =>
            prevElement.map(element => {
                if (element.id === id) {
                    const newDefectsList = element.defectsList.filter(defect => defect.id !== defectId)
                    return { ...element, defectsList: newDefectsList }
                }
                else return element
            }
            )
        )
    }
    //handleNuevaCatacion();
    return (
        <div className="Image2Background">
            <BarraNavegacion miLote={reactLote[0]}/>
            <div className="container-analisisf">
                <Helmet>
                    <title>Catación</title>
                </Helmet> 
                <div>
                    <div className="tableHeader">
                        <div className="field">
                            <h2 style={{ display: "inline" }}>Catador </h2>
                            <input value={catador} type="text" onChange={(e) => handleCatador(e)}></input>
                        </div>
                    </div>
                    <div className="tableBody">
                        {catacionElements.map(catacionElement => (
                            <CatacionContainer key={catacionElement.id}>
                                <CatacionHeader>
                                    <h2>Muestra {catacionElement?.id}</h2><br />
                                    <LoteCodigo miLote={reactLote[catacionElement.id]} handleCodigo={(e)=>{}}/>
                                    <LoteInfo miLote={reactLote[catacionElement.id]} />
                                    
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
                                            <textarea value={catacionElement.fraganciaA} className="atributosInput" placeholder="Fragancias" onChange={(e) => handleAtributoChange(catacionElement.id, "fraganciaA", e)} />
                                        
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
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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

                                            <textarea className="atributosInput" placeholder="Sabores" value={catacionElement?.saborA} onChange={(event) => handleAtributoChange(catacionElement.id, "saborA", event)} />
                                        </SCABlock>
                                        <SCABlock> 
                                            <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                                            <textarea value={catacionElement.residualA} className="atributosInput" placeholder="Atributos" onChange={(e) => handleAtributoChange(catacionElement.id, "residualA", e)} />
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
                                            <textarea value={catacionElement.acidezA} className="atributosInput" placeholder="Atributos" onChange={(e) => handleAtributoChange(catacionElement.id, "acidezA", e)} />
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
                                            <textarea className="atributosInput" placeholder="Atributos" onChange={(e) => handleAtributoChange(catacionElement.id, "cuerpoA", e)} />
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
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                                                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
                                                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                                                    <div className="SCAScore">
                                                        <h2>Total: {catacionElement?.SCAdefects}</h2>
                                                    </div>
                                                </div>
                                                <div style={{ margin: "5px", display: "flex", flexDirection: "column" }}>
                                                    <div>
                                                        <h4>Defectos</h4>
                                                    </div>
                                                    <div>
                                                        <h4>Ctd: {catacionElement.SCAdefectsQty}</h4>
                                                        <h4>Intensidad: {catacionElement?.defectsIntesity}</h4>
                                                        <button className="intensityButton" id="intensity2" onClick={() => handleDefectsChange(catacionElement.id, 2)}>2</button>
                                                        <button className="intensityButton" id="intensity4" onClick={() => handleDefectsChange(catacionElement.id, 4)}>4</button>
                                                    </div>
                                                </div>
                                            </SCABlock>
                                        </SCABlock>
                                    </ScoreInputsContainer>
                                    <div className="selectDefectos" style={{ fontSize: "16px",}} >
                                        <h3>Defectos</h3>
                                        <select value={defectValue.name} onChange={(e) => handleDefectValue(e)} className="selectDEF">
                                            <option value="">Seleccione una opción</option>
                                            {predefinedDefects.map((option) => (
                                                <option key={option.id} value={option.name}>
                                                    {option.name}
                                                </option>
                                            ))}
                                        </select>
                                        <button className="agg" onClick={() => handleAddDefect(catacionElement.id)}>Agregar</button>

                                        {catacionElement.defectsList.map((row) => (
                                            <tr key={row.id}>
                                                <td>{row.name}</td>
                                                <td>
                                                    <button onClick={() => handleDeleteDefect(catacionElement.id, row.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </div>
                                </CatacionData>
                            </CatacionContainer>
                        ))}
                        <AddCatacionButton onClick={handleNuevaCatacion} style={{backgroundColor:"#007bff"}}>
                            Agregar Catacion
                        </AddCatacionButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
