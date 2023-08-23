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
`;

const ScoreInputsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 10px;
  }
`;

// ... (rest of the styles)


const CatacionContainer = styled.div`
  border: 1px solid #ccc;
  padding: 0px;
`;

const CatacionHeader = styled.h1`
  font-size: 24px;
`;

const CatacionData = styled.div`
  margin-top: 10px;
`;

const CatacionScoreInputs = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`;
const AddCatacionButton = styled.button`
  margin-bottom: 20px;
  /* Other styles you want to apply */
`;
// TERMINAN ESTILOS ----------------------------------------------

export default function Catacion() {
    const location = useLocation();
    const { data } = location.state || {};
    const { ID, NombreCaficultor, Municipio, Variedad, Proceso, Peso, Altura, NumeroCel } = data || {};
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
        <PageContainer>
            <h2>Nombre de caficultor: {NombreCaficultor}</h2>
            <h2>Municipio de cultivo: {Municipio}</h2>
                {catacionElements.map(catacionElement => (
                    <CatacionContainer key={catacionElement.id}>
                        <CatacionHeader>
                            Muestra {catacionElement.id} <br/>
                            Codigo:
                            <input type="text" id="InputCodigoLote" onChange={(event)=>handleCatacionProp(catacionElement.id, "codigo", event)} value={catacionElement.codigo}></input>
                            <button >Buscar</button>
                            <a href="/RegistroLote/Catacion" target="_blank">Registrar Lote</a>
                        </CatacionHeader>
                        <button onClick={e=>{handleInfoView(catacionElement.id)}}>Ver/ocultar info</button>
                        <div className={catacionElement.InfoView? "InfoVisible":"InfoInvisible"}>
                            <h3>Altura: {catacionElement.altura}    Variedad: {catacionElement.variedad}      proceso: {catacionElement.proceso}</h3>

                        </div>
                        <CatacionData >
                            {/* ... (other data) */}
                            <CatacionScoreInputs>
                                
                                <ScoreInputsContainer>
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
                                <CoffeeScoreInput
                                    aspect="sabor"
                                    score={catacionElement.sabor || 8}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "sabor", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="residual"
                                    score={catacionElement.residual || 8}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "residual", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="acidez"
                                    score={catacionElement.acidez || 8}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "acidez", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="intensidad"
                                    score={catacionElement.intensidad || 8}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "intensidad", value)
                                    }
                                />
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
                                <CoffeeScoreInput
                                    aspect="balance"
                                    score={catacionElement.balance || 8}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "balance", value)
                                    }
                                /> 
                                {/* Add more CoffeeScoreInput components for other attributes */}
                                
                                <div>
                                    <h4>Uniformidad</h4>
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
                                <div>
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
                                <div>
                                    <h4>Dulzor</h4>
                                    {[1, 2, 3, 4, 5].map((value, index) => (
                                        <input
                                            key={value}
                                            type="checkbox"
                                            checked={catacionElement.dulzor !== undefined && catacionElement.dulzor >= value}
                                            onChange={() => {
                                                handleScoreChange(catacionElement.id, "dulzor", value);
                                            }}
                                        />
                                    ))}
                                </div>
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
                            </CatacionScoreInputs>
                        </CatacionData>
                    </CatacionContainer>
                ))}
                <AddCatacionButton onClick={handleNuevaCatacion}>
                    Agregar Catacion
                </AddCatacionButton>
        </PageContainer>
    );
}
