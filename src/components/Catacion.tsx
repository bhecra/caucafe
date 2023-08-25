import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components';
import CoffeeScoreInput from './CoffeeScoreInput';
import {SCAboxList, CatacionLote, puntajeSCA} from './MyTypes';
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
    width: inherit;
    width: 150px ;
    max-height: 300px;
    min-height: 100px;
`;
const CatacionData = styled.div`
  margin-top: 10px;
  
`;

const CatacionScoreInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  
  flex-direction: row !important;
`;
const AddCatacionButton = styled.button`
  margin-bottom: 20px;
  /* Other styles you want to apply */
`;
// TERMINAN ESTILOS ----------------------------------------------




export default function Catacion() {
    const location = useLocation();
    const { data } = location.state || {};
    const { ID, NombreCaficultor, Municipio, Variedad, Proceso,Altura, Peso,  NumeroCel } = data || {};
    const [catacionCount, setCatacionCount] = useState(1);
    
    const falseSCAboxList: SCAboxList = [
            {index:1, value: false},
            {index:2, value: false},
            {index:3, value: false},
            {index:4, value: false},
            {index:5, value: false},
        ]
    
    const MuestraInicial:CatacionLote = {
        id: 1,
        codigo: ID,
        InfoView: false,
        InfoClass: "InfoInvisible",
        variedad: Variedad,
        proceso: Proceso,
        altura: Altura,
        dulzor: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
        uniformidad: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
        
        tazaLimpia: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
        uniformidadScore: 10,
        dulzorScore: 10,
        tazaLimpiaScore:10,

    }
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([MuestraInicial]);
    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);
        const newCatacionElement: CatacionLote = {
            id: newCatacionCount,
            InfoView: false,
            dulzor: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
            uniformidad: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
            tazaLimpia: [
            {index:1, value: true},
            {index:2, value: true},
            {index:3, value: true},
            {index:4, value: true},
            {index:5, value: true},
        ],
        };
        setCatacionElements(prevElements => [...prevElements, newCatacionElement]);
    };
    function handleCatacionProp(id:number, Propiedad: keyof CatacionLote,  e:React.ChangeEvent<HTMLInputElement> ){
        const newValue = e.target.value
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data,[Propiedad]: newValue } : data
            )
        );
    }
    function handleInfoView(id: number) {
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, InfoView: !data.InfoView} : data
            )
        );
        
    }
    const handleScoreChange = (
        id: number,
        aspect: keyof CatacionLote,
        value: number
    ) => {
        setCatacionElements(prevElements =>
            prevElements.map(element =>
                element.id === id ? { ...element, [aspect]: value } : element
            )
        );
    };
    const handleUniformidadChange = (
        id: number,
        InputIndex: number
    ) => {
        let newScore:number = 0;
        //let newSCABoxList:SCAboxList
        catacionElements.forEach(catacionElement=>{
            if(catacionElement.id===id){
                let newSCABoxList=catacionElement.uniformidad
                newSCABoxList.forEach(box=>{
                    box.value =  box.index===InputIndex? !box.value: box.value;
                    if(box.value) newScore+=2
                })
                setCatacionElements(prevData =>
                    prevData.map(data =>
                        data.id === id ? { ...data, uniformidad:newSCABoxList, uniformidadScore: newScore} : data
                    )
                );
            }
        })
            
    }
    const handleTazaLimpiaChange = (
        id: number,
        InputIndex: number
    ) => {
        let newScore:number = 0;
        let newSCABoxList: SCAboxList=falseSCAboxList;
        catacionElements.forEach(catacionElement=>{
            if(catacionElement.id===id){
                newSCABoxList=catacionElement.tazaLimpia
            }
        })
        newSCABoxList.forEach(box=>{
            box.value =  box.index===InputIndex? !box.value: box.value;
            if(box.value) newScore+=2
        })
        
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, tazaLimpia:newSCABoxList, tazaLimpiaScore:newScore} : data
            )
        );
    }
    function handleDulzorChange(id: number,InputIndex: number) {
        let newScore: number = 0;
        let newDSCABoxList: SCAboxList = falseSCAboxList;
        catacionElements.forEach(catacionElement => {
            if (catacionElement.id === id) {
                newDSCABoxList = catacionElement.dulzor;
            }
        });
        newDSCABoxList.forEach(box => {
            box.value = box.index === InputIndex ? !box.value : box.value;
            if (box.value) newScore += 2;
        });

        setCatacionElements(prevData => 
            prevData.map(
            data => data.id === id ? { ...data, dulzor: newDSCABoxList, dulzorScore: newScore } : data
        )
        );
    }
    //handleNuevaCatacion();
    return (
        <div className="Image2Background" >
            <div>
                <div className="tableHeader">
                    <div className="field">
                        <h2>Catador: {NombreCaficultor}</h2>
                        <h2>Codigo de mesa: {Municipio}</h2>
                    </div>
                </div>
                <div className="tableBody">
                    {catacionElements.map(catacionElement => (
                        <CatacionContainer key={catacionElement.id}>
                            <CatacionHeader>
                                <h2>Muestra {catacionElement.id}</h2><br/>
                                <div className="searchdiv" style={{height:"25px"}}>
                                    <input autoCapitalize="characters"  placeholder="Código" type="text" id="InputCodigoLote" onChange={(event)=>handleCatacionProp(catacionElement.id, "codigo", event)} value={catacionElement.codigo}></input>
                                    <button>Buscar</button>

                                </div>
                                <a style={{fontSize:"14px", color:"black", display:"block"}} href="/RegistroLote/Catacion" target="_blank"> Registrar Lote</a> <br/>
                                <button style={{fontSize:"16px"}} onClick={e=>{handleInfoView(catacionElement.id)}}>Ver/ocultar info</button>
                                <div className={catacionElement.InfoView? "InfoVisible":"InfoInvisible"}><br/>
                                    <p style={{fontSize:"14px"}} id="catacionInfoLote">
                                        Variedad: {catacionElement?.variedad}<br/>
                                        Altura: {catacionElement?.altura}<br/>
                                        Proceso: {catacionElement.proceso}
                                    </p>
                                </div>
                            </CatacionHeader>
                            <CatacionData >
                                <ScoreInputsContainer>
                                    <SCABlock>
                                        <CoffeeScoreInput
                                            aspect="Fragancia"
                                            score={catacionElement.fragancia || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "fragancia", value as puntajeSCA)
                                            }
                                        />
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
                                            <CoffeeScoreInput
                                                aspect="Sabor"
                                                score={catacionElement.sabor || 8}
                                                onChange={(value) =>
                                                    handleScoreChange(catacionElement.id, "sabor", value)
                                                }
                                            />
                                            
                                        </SCABlock>
                                        <SCABlock>
                                            <CoffeeScoreInput
                                                aspect="Residual"
                                                score={catacionElement.residual || 8}
                                                onChange={(value) =>
                                                    handleScoreChange(catacionElement.id, "residual", value)
                                                }
                                            />
                                        </SCABlock>
                                    <SCABlock>
                                        <CoffeeScoreInput
                                            aspect="Acidez"
                                            score={catacionElement.acidez || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "acidez", value)
                                            }
                                        />
                                        <CoffeeScoreInput
                                            aspect="Intensidad"
                                            score={catacionElement.intensidad || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "intensidad", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <CoffeeScoreInput
                                            aspect="cuerpo"
                                            score={catacionElement.cuerpo || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "cuerpo", value)
                                            }
                                        />
                                        <CoffeeScoreInput
                                            aspect="nivel"
                                            score={catacionElement.nivel || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "nivel", value)
                                            }
                                        />
                                    </SCABlock>
                                    <SCABlock>
                                        <div className="SCACheckBox">
                                        <h2 style={{fontSize:"16px"}}>Uniformidad</h2>
                                        {catacionElement.uniformidad.map((scabox) => (
                                            <input 
                                                type="checkbox"
                                                checked={scabox.value}
                                                onChange={() => {
                                                    handleUniformidadChange(catacionElement.id, scabox.index);
                                                }}
                                            />
                                        ))}
                                        <h3>Puntaje: {catacionElement.uniformidadScore}</h3>
                                        </div>
                                        <CoffeeScoreInput
                                            aspect="balance"
                                            score={catacionElement.balance || 8}
                                            onChange={(value) =>
                                                handleScoreChange(catacionElement.id, "balance", value)
                                            }
                                        /> 
                                    </SCABlock>
                                {/* Add more CoffeeScoreInput components for other attributes */}
                                
                                <SCABlock>

                                <div className="SCACheckBox">
                                    <h3 style={{display: "inline"}}>{catacionElement.tazaLimpiaScore}</h3>
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
                                <div >
                                    <h3 style={{display: "inline"}}>{catacionElement.dulzorScore}</h3>
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
                                <div>
                                <CoffeeScoreInput
                                    aspect="Puntaje Catador"
                                    score={catacionElement.puntajeCatador || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "puntajeCatador", value)
                                    }
                                />
                                </div>
                                </ScoreInputsContainer>
                            </CatacionData>
                        </CatacionContainer>
                    ))}
                </div>
                <AddCatacionButton onClick={handleNuevaCatacion}>
                    Agregar Catacion
                </AddCatacionButton>
            </div>
        </div>
    );
}
