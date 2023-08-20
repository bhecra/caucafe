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
    id: number;
    codigo?: string;
    InfoView: "InfoVisible" | "InfoInvisible";
    variedad?: string;
    altura?: number;
    proceso?: string;
    factordeRendimiento?: number;
    defectos?: defecto[];
    tostion?: number;
    catador?: string;
    fragancia?: puntajeSCA;
    seco?: number;
    espumoso?: number;
    sabor?: number;
    residual?: number;
    acidez?: number;
    intensidad?: number;
    cuerpo?: number;
    nivel?: number;
    balance?: number;
    uniformidad?: number;
    tasaLimpia?: number;
    dulzor?: number;
    puntajeCatador?: number;
}



// ... ESTILOS ......................

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  font-family: Arial, sans-serif;
  padding: 20px;
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
  padding: 10px;
  margin-bottom: 20px;
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
    const [catacionCount, setCatacionCount] = useState(0);
    const [catacionElements, setCatacionElements] = useState<CatacionLote[]>([]);

    const handleNuevaCatacion = () => {
        const newCatacionCount = catacionCount + 1;
        setCatacionCount(newCatacionCount);

        const newCatacionElement: CatacionLote = {
            id: newCatacionCount,
            InfoView: "InfoInvisible"
        };
        setCatacionElements(prevElements => [...prevElements, newCatacionElement]);
    };

    const handleCodigo = (id: number, newCodigo: string) => {
        setCatacionElements(prevData =>
            prevData.map(data =>
                data.id === id ? { ...data, codigo: newCodigo } : data
            )
        );
    };

    function handleInfoView(id: number) {
        setCatacionElements(catacionElements =>
            catacionElements.map(catacionElement => {
                if (catacionElement.id === id) {
                    return {
                        ...catacionElement,
                        InfoView:
                            catacionElement.InfoView === "InfoInvisible"
                                ? "InfoVisible"
                                : "InfoInvisible"
                    };
                } else {
                    return catacionElement;
                }
            })
        );
    }

    const location = useLocation();
    const { data } = location.state || {};
    const { ID, NombreCaficultor, Municipio } = data || {};

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

    return (
        <PageContainer>
            <h2>Codigo del lote {ID}</h2>
            <h2>Nombre de caficultor: {NombreCaficultor}</h2>
            <h2>Municipio de cultivo: {Municipio}</h2>
            <h1>Esta es la pagina de catacion</h1>
            <div>
                <h1>Botón para Agregar Inputs</h1>
                <AddCatacionButton onClick={handleNuevaCatacion}>
                    Agregar Catacion
                </AddCatacionButton>
                {catacionElements.map(catacionElement => (
                    <CatacionContainer key={catacionElement.id}>
                        <CatacionHeader>Muestra {catacionElement.id}</CatacionHeader>
                        {/* ... (other code) */}
                        <CatacionData className={catacionElement.InfoView}>
                            <h3>Altura: {catacionElement.altura} Variedad: {catacionElement.variedad} proceso: {catacionElement.proceso}</h3>
                            {/* ... (other data) */}
                            <CatacionScoreInputs>
                                
                                <ScoreInputsContainer>
                                <CoffeeScoreInput
                                    aspect="fragancia"
                                    score={catacionElement.fragancia || 0}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "fragancia", value as puntajeSCA)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="seco"
                                    score={catacionElement.seco || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "seco", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="espumoso"
                                    score={catacionElement.espumoso || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "espumoso", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="sabor"
                                    score={catacionElement.sabor || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "sabor", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="residual"
                                    score={catacionElement.residual || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "residual", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="acidez"
                                    score={catacionElement.acidez || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "acidez", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="intensidad"
                                    score={catacionElement.intensidad || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "intensidad", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="cuerpo"
                                    score={catacionElement.cuerpo || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "cuerpo", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="nivel"
                                    score={catacionElement.nivel || 6}
                                    onChange={(value) =>
                                        handleScoreChange(catacionElement.id, "nivel", value)
                                    }
                                />
                                <CoffeeScoreInput
                                    aspect="balance"
                                    score={catacionElement.balance || 6}
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
            </div>
        </PageContainer>
    );
}
