 import {Link, useParams,} from "react-router-dom";
//import InputTexto from "./InputTexto";
import { useState } from "react";
//import UbicacionesGeograficas from "./UbicacionesGeograficas";
//import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Lote } from "./MyTypes";
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
function leerInput (InputID:string){
    const HTMLElement = document.getElementById(`${InputID}`) as HTMLInputElement
    const Value = HTMLElement.value
    return Value
}
const procesos:listItems[] = [
    {id:0,nombre:"Lavado"},
    {id:1,nombre:"Natural"},
    {id:2,nombre:"Honey"},
    {id:3,nombre:"Fermentación"},
    {id:4,nombre:"Otro"}
]
const variedadesCafe:listItems[] = [
    {id:0,nombre:"Otra"},
    {id:1,nombre:"Bourbon"},
    {id:2,nombre:"Bourbon Rosado"},
    {id:3,nombre:"Castillo"},
    {id:4,nombre:"Catimore"},
    {id:5,nombre:"Caturra"},
    {id:6,nombre:"Cenicafe 1"},
    {id:7,nombre:"Chiroso"},
    {id:8,nombre:"Colombia"},
    {id:9,nombre:"Geisha"},
    {id:10,nombre:"Laurina"},
    {id:11,nombre:"Maragogipie"},
    {id:12,nombre:"Pacamara"},
    {id:13,nombre:"Sidra"},
    {id:14,nombre:"Sudan Rume"},
    {id:15,nombre:"Supremo"},
    {id:16,nombre:"Tabi"},
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
type InfoRegistro = {
    nombreCaficultor?:string,
    proceso?:string,
    municipio?:string,
    variedad?:string,
    numeroCel?:string,
    altura?: number,
    peso?: number,
}
export default function RegistroLote () {
    const {siguiente} = useParams();
	const [idLote, setIdLote] = useState('')
    const [registroLote, setRegistroLote] = useState<Lote>()
    //Falta Altura (msnm) 

    //const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);
    function cambiarLote(atributo: keyof Lote, id:string){
		const Input:any = leerInput(id);
        setRegistroLote({...registroLote, [atributo]:Input})
    }
    function CrearLote ():void {
		setIdLote(generarCodigo())
      }
      /*const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const municipioId = parseInt(event.target.value);
        const selectedMun = municipiosCauca.find(mun => mun.id === municipioId);
        setSelectedMunicipio(selectedMun || null);
        console.log(selectedMunicipio?.nombre)
      };*/
      //<InputTexto nombre="Nombre de caficultor:" Id="NombreCaficultor"/>
    return(
        <div className="ImageBackground">   
            <header className="header">
                <img width={300} src= {logo} alt="logo-caucafe"></img>
            </header>
            <div className="field">   
                <div className="loteForm">
                    <div className="campoRegistroLote">
                        <label htmlFor="NombreCaficultor"> Nombre de caficultor </label> 
                        <input type="text" name="NombreCaficultor" id={"NombreCaficultor"} onChange={e=>cambiarLote("nombreCaficultor", "NombreCaficultor")}/><br/>
                    </div>
                    <div className="campoRegistroLote">
                        <label htmlFor="celular">Telefono</label>
                        <input type="tel" id ="celular"   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Ej: 3161112222" onChange={e=>cambiarLote("numeroCel","celular")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Municipio de Cultivo:  </label>
                        <select id= "MunicipioSelect" onChange={e=>cambiarLote("municipio", "MunicipioSelect")} className="input-text">
                            <option value={0}>Selecciona un municipio</option>
                            {municipiosCauca.map(mun => (
                            <option key={mun.id} value={mun.nombre}>{mun.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Altura de la finca (msnm)</label>
                        <input type="number" id="alturaFinca" onChange={e=>cambiarLote("altura", "alturaFinca")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label htmlFor="pesoLote">Peso del lote (Kg)</label>
                        <input value={registroLote?.peso} type="number" id="pesoLote" onChange={e=>cambiarLote("peso", "pesoLote")}></input>
                    </div>
                    <div className="campoRegistroLote">
                        <label>Variedad</label>
                        <select  id="variedadLote" onChange={e=>cambiarLote("variedad", "variedadLote")} className="input-text">
                            <option>Seleccione</option>
                            {variedadesCafe.map(vari => ( <option key={vari.id}>{vari.nombre}</option>))}
                        </select>
                    </div>
                    <div className="campoRegistroLote">
                        <label >Proceso</label>
                        <select  id="procesoLote" onChange={e=>cambiarLote("proceso", "procesoLote")} className="input-text">
                            <option>Seleccione</option>
                            {procesos.map(vari => ( <option key={vari.id}>{vari.nombre}</option>))}
                        </select>
                    </div>
                    <div className="campoBoton">
                        <button onClick ={CrearLote} className="botonGuardar">Generar</button>
                    </div>
                    <div className="bottomRegistro">
                        <h3> Codigo de Lote: {idLote}</h3>
                        <div className="siguiente">
                            <h2>
                                <Link to = {`/${siguiente}`}
                                state= {{data:{
                                    ID: idLote,
                                    NombreCaficultor:registroLote?.nombreCaficultor,
                                    Municipio: registroLote?.municipio,
                                    Variedad: registroLote?.variedad,
                                    Proceso: registroLote?.proceso,
                                    Altura: registroLote?.altura,
                                    Peso: registroLote?.peso,
                                    NumeroCel: registroLote?.numeroCel
                                }}} > Siguiente </Link>
                            </h2>
                            <h2>
                                <Link to = {'/AnalisisFisico'}
                                state= {{miLote: registroLote
                                }} > Siguiente 2 </Link>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}