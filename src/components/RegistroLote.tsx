import { useLocation } from "react-router-dom";
//import InputTexto from "./InputTexto";
import { useState  } from "react";
import React from "react";
//import UbicacionesGeograficas from "./UbicacionesGeograficas";
//import { useState } from "react";
import { Lote } from "./MyTypes";
//@ts-ignore
import { Helmet } from 'react-helmet';
import BarraNavegacion from "./BarraNavegacion";
import { createLote } from "./LoteInfo";
type listItems = {
    id: number
    nombre: string
}
interface Municipio {
    id: number;
    nombre: string;
}
const municipiosCauca: Municipio[] = [
    { id: 301, nombre: 'Almaguer' },
    { id: 302, nombre: 'Argelia' },
    { id: 303, nombre: 'Balboa' },
    { id: 304, nombre: 'Bolívar' },
    { id: 305, nombre: 'Buenos Aires' },
    { id: 306, nombre: 'Cajibío' },
    { id: 307, nombre: 'Caldono' },
    { id: 308, nombre: 'Caloto' },
    { id: 309, nombre: 'Corinto' },
    { id: 310, nombre: 'El Tambo' },
    { id: 311, nombre: 'Florencia' },
    { id: 312, nombre: 'Guachené' },
    { id: 313, nombre: 'Guapi' },
    { id: 314, nombre: 'Inzá' },
    { id: 315, nombre: 'Jambaló' },
    { id: 316, nombre: 'La Sierra' },
    { id: 317, nombre: 'La Vega' },
    { id: 318, nombre: 'López de Micay' },
    { id: 319, nombre: 'Mercaderes' },
    { id: 320, nombre: 'Miranda' },
    { id: 321, nombre: 'Morales' },
    { id: 322, nombre: 'Padilla' },
    { id: 323, nombre: 'Páez' },
    { id: 324, nombre: 'Patía' },
    { id: 325, nombre: 'Piamonte' },
    { id: 326, nombre: 'Piendamó' },
    { id: 327, nombre: 'Popayán' },
    { id: 328, nombre: 'Puerto Tejada' },
    { id: 329, nombre: 'Puracé' },
    { id: 330, nombre: 'Rosas' },
    { id: 331, nombre: 'San Sebastián' },
    { id: 332, nombre: 'Santa Rosa' },
    { id: 333, nombre: 'Santander de Quilichao' },
    { id: 334, nombre: 'Silvia' },
    { id: 335, nombre: 'Sotará' },
    { id: 336, nombre: 'Suárez' },
    { id: 337, nombre: 'Sucre' },
    { id: 338, nombre: 'Timbío' },
    { id: 339, nombre: 'Timbiquí' },
    { id: 340, nombre: 'Toribío' },
    { id: 341, nombre: 'Totoró' },
    { id: 342, nombre: 'Villa Rica' },
];
export function leerInput(InputID: string) {
    const HTMLElement = document.getElementById(`${InputID}`)
    if(HTMLElement instanceof HTMLInputElement || HTMLElement instanceof HTMLSelectElement){
        const Value = HTMLElement.value
        return Value
    }
}
const procesos: listItems[] = [
    { id: 0, nombre: "Lavado" },
    { id: 1, nombre: "Natural" },
    { id: 2, nombre: "Honey" },
    { id: 3, nombre: "Fermentación" },
    { id: 4, nombre: "Otro" }
]
const variedadesCafe: listItems[] = [
    { id: 0, nombre: "Otra" },
    { id: 1, nombre: "Bourbon" },
    { id: 2, nombre: "Bourbon Rosado" },
    { id: 3, nombre: "Castillo" },
    { id: 4, nombre: "Catimore" },
    { id: 5, nombre: "Caturra" },
    { id: 6, nombre: "Cenicafe 1" },
    { id: 7, nombre: "Chiroso" },
    { id: 8, nombre: "Colombia" },
    { id: 9, nombre: "Geisha" },
    { id: 10, nombre: "Laurina" },
    { id: 11, nombre: "Maragogipie" },
    { id: 12, nombre: "Pacamara" },
    { id: 13, nombre: "Sidra" },
    { id: 14, nombre: "Sudan Rume" },
    { id: 15, nombre: "Supremo" },
    { id: 16, nombre: "Tabi" },
]

function generarCodigo(): string {
    const caracteresValidos = '0123456789ABCDE';
    const longitudCodigo = 5;
    let codigoGenerado = '';
    for (let i = 0; i < longitudCodigo; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresValidos.length);
        codigoGenerado += caracteresValidos.charAt(indiceAleatorio);
    }
    return codigoGenerado;
}

export default function RegistroLote() {
    const location = useLocation();
    const { miLote }: { miLote: Lote } = location.state || createLote();
    const [registroLote, setRegistroLote] = useState<Lote>(miLote)
    //Falta Altura (msnm) 

    //const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);
    function cambiarLote(atributo: keyof Lote, id: string) {
        const Input: any = leerInput(id);
        setRegistroLote({ ...registroLote, [atributo]: Input})
    }
    function CrearLote(): void {
        setRegistroLote({ ...registroLote, codigo: generarCodigo() })
    }
    /*const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const municipioId = parseInt(event.target.value);
      const selectedMun = municipiosCauca.find(mun => mun.id === municipioId);
      setSelectedMunicipio(selectedMun || null);
    };*/
    //<InputTexto nombre="Nombre de caficultor:" Id="NombreCaficultor"/>


    return (
        <div className="ImageBackground">
            <BarraNavegacion miLote={registroLote}/>

            <div className="field">
                <div className="loteForm">
                    <div className="campoRegistroLote">
                        <label htmlFor="NombreCaficultor"> Nombre de caficultor </label>
                        <input value={registroLote?.nombreCaficultor} type="text" name="NombreCaficultor" id={"NombreCaficultor"} onChange={e => cambiarLote("nombreCaficultor", "NombreCaficultor")} /><br />
                    </div>
                    <div className="campoRegistroLote">
                        <label htmlFor="idCaficultor"> Número de cédula </label>
                        <input value={registroLote?.idCaficultor} type="text" name="idCaficultor" id={"idCaficultor"} onChange={e => cambiarLote("idCaficultor", "idCaficultor")} /><br />
                    </div>
                    <div className="campoRegistroLote">
                        <label htmlFor="celular">Telefono</label>
                        <input value={registroLote?.numeroCel} type="tel" id="celular" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Ej: 3161112222" onChange={e => cambiarLote("numeroCel", "celular")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Municipio de Cultivo:  </label>
                        <select value={registroLote?.municipio} id="MunicipioSelect" onChange={e => cambiarLote("municipio", "MunicipioSelect")} className="input-text">
                            <option value={0}>Selecciona un municipio</option>
                            {municipiosCauca.map(mun =>{
                                const isSelected = registroLote?.municipio===mun.nombre?true:false
                                return (
                                <option key={mun.id} value={mun.nombre} selected={isSelected}>{mun.nombre}</option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Altura de la finca (msnm)</label>
                        <input value={registroLote?.altura} type="number" id="alturaFinca" onChange={e => cambiarLote("altura", "alturaFinca")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label htmlFor="pesoLote">Peso del lote (Kg)</label>
                        <input value={registroLote?.peso} type="number" id="pesoLote" onChange={e => cambiarLote("peso", "pesoLote")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Variedad</label>
                        <select value={registroLote?.variedad} id="variedadLote" onChange={e => cambiarLote("variedad", "variedadLote")} className="input-text">
                            <option>Seleccione</option>
                            {variedadesCafe.map(vari =>{
                                const isSelected = registroLote?.variedad===vari.nombre
                                return (<option key={vari.id} selected={isSelected}>{vari.nombre}</option>)
                            })} 
                        </select>
                    </div>
                    <div className="campoRegistroLote">
                        <label >Proceso</label>
                        <select id="procesoLote" onChange={e => cambiarLote("proceso", "procesoLote")} className="input-text">
                            <option>Seleccione</option>
                            {procesos.map(vari => (<option key={vari.id}>{vari.nombre}</option>))}
                        </select>
                    </div>
                    <div className="campoBoton">
                        <button onClick={CrearLote} >Generar</button>
                        <h3> Codigo de Lote: {registroLote?.codigo}</h3>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}