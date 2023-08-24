import { useLocation } from "react-router-dom";
import React, { useState } from 'react';
import styled from 'styled-components';
import CoffeeScoreInput from './CoffeeScoreInput';

type defecto = {
    nombreDefecto: string;
    peso?: number;
    porcentaje: number;
};

type puntajeSCA =
    | 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10;
interface CatacionLote {
    acidez?: number;
    altura?: number;
    balance?: number;
    catador?: string;
    codigo?: string;
    cuerpo?: number;
    defectos?: defecto[];
    dulzor?: number;
    factordeRendimiento?: number;
    fragancia?: puntajeSCA;
    id: number;
    InfoClass?: "InfoVisible" | "InfoInvisible"
    InfoView: boolean;
    intensidad?: number;
    mojado?: number;
    nivel?: number;
    proceso?: string;
    puntajeCatador?: number;
    residual?: number;
    sabor?: number;
    seco?: number;
    tasaLimpia?: number;
    tostion?: number;
    uniformidad?: number;
    variedad?: string;
}



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

// ... (rest of the styles)


const CatacionContainer = styled.div`
    background-color: rgb(255,255,255,0.5);
    display: flex;
    flex-direction: row;
    margin: 3%;
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
`;
const SCABlock = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    padding: 10px;
    width: 150px;
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
    
    const MuestraInicial:CatacionLote = {
        id: 1,
        codigo: ID,
        InfoView: true,
        InfoClass: "InfoVisible",
        variedad: Variedad,
        proceso: Proceso,
        altura: Altura,
    }
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([MuestraInicial]);
    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);
        const newCatacionElement: CatacionLote = {
            id: newCatacionCount,
            InfoView: false
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
    //handleNuevaCatacion();
    return (
        <div className="Image2Background" >
            <div>
                <h2>Catador: {NombreCaficultor}</h2>
                <h2>Codigo de mesa: {Municipio}</h2>
                    {catacionElements.map(catacionElement => (
                        <CatacionContainer key={catacionElement.id}>
                            <CatacionHeader>
                                <h2>Muestra {catacionElement.id}</h2><br/>
                                <label style={{display:"inline", fontSize:"16px"}}>Codigo: </label> 
                                <input style={{width: "100px", display:"inline", fontSize:"16px"}}  type="text" id="InputCodigoLote" onChange={(event)=>handleCatacionProp(catacionElement.id, "codigo", event)} value={catacionElement.codigo}></input>
                                <button style={{display:"inline", fontSize:"16px"}} className="buscarLote">Buscar</button>
                                <a style={{fontSize:"16px", color:"gray", display:"block"}} href="/RegistroLote/Catacion" target="_blank"> Registrar Lote</a> <br/><br/>
                                <button style={{fontSize:"16px"}} onClick={e=>{handleInfoView(catacionElement.id)}}>Ver/ocultar info</button>
                                <div className={catacionElement.InfoView? "InfoVisible":"InfoInvisible"}>
                                    <p  id="catacionInfoLote">
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
                                        <div>
                                        <h2 style={{fontSize:"16px"}}>Uniformidad</h2>
                                        {[1, 2, 3, 4, 5].map((value, index) => (
                                            <input
                                                key={value}
                                                type="checkbox"
                                                checked={catacionElement.uniformidad!== undefined && catacionElement.uniformidad >= value}
                                                onChange={() => {
                                                    handleScoreChange(catacionElement.id, "uniformidad", value);
                                                }}
                                            />
                                        ))}
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
                                    <h4>Tasa Limpia</h4>
                                    {[1, 2, 3, 4, 5].map((value, index) => (
                                        <input
                                            key={value}
                                            type="checkbox"
                                            checked={catacionElement.tasaLimpia !== undefined && catacionElement.tasaLimpia >= value}                                            onChange={() => {
                                                handleScoreChange(catacionElement.id, "tasaLimpia", value);
                                            }}
                                        />
                                    ))}
                                </div>
                                <div >
                                    <h4>Dulzor</h4>
                                    <div className="SCACheckBox">

                                    {[1, 2, 3, 4, 5].map((value, index) => (
                                        <input
                                            key={value}
                                            type="checkbox"
                                            checked={catacionElement.dulzor !== undefined && catacionElement.dulzor >= value}
                                            onChange={() => {
                                                handleScoreChange(catacionElement.id, "dulzor", value);
                                            }}/>
                                    ))}
                                    </div>
                                </div>
                                </SCABlock>
                                <div>
                                <CoffeeScoreInput
                                    aspect="Puntaje     Catador"
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
                <AddCatacionButton onClick={handleNuevaCatacion}>
                    Agregar Catacion
                </AddCatacionButton>
            </div>
        </div>
    );
}
