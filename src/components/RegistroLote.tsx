 import {Link, useParams,} from "react-router-dom";
import InputTexto from "./InputTexto";
import { useEffect, useState } from "react";
//import UbicacionesGeograficas from "./UbicacionesGeograficas";
//import { useState } from "react";
import logo from "../assets/images/logo.svg";
type variedad = {
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
const variedadesCafe:variedad[] = [
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
      
export default function RegistroLote () {
    const {siguiente} = useParams();
	const [nombreCaficultor, setNombreCaficultor] = useState('')
	const [idLote, setIdLote] = useState('')
	const [selectedMunicipio, setSelectedMunicipio] = useState('')
    const [selectedVariedad, setSelectedVariedad] = useState('')
    const [numeroCel, mifuncioncambiarcel] = useState('')
    const [entradasValidas, setEntradasValidas] = useState("Incorrectas")
    //Falta Altura (msnm) 
    const comprobarValidez = ()=>{
        if(numeroCel.length!==10 || nombreCaficultor.length<5){setEntradasValidas("Incorrectas")}
        else {setEntradasValidas("Correcta")}
    }
    useEffect(()=>{
        comprobarValidez()
    },[numeroCel])
    useEffect(()=>{
        comprobarValidez()
    },[nombreCaficultor])
    //const [selectedMunicipio, setSelectedMunicipio] = useState<Municipio | null>(null);
    function cambiarLote():void{
		setNombreCaficultor(leerInput("NombreCaficultor"))
        setSelectedVariedad(leerInput("variedadLote"))
        setSelectedMunicipio(leerInput("MunicipioSelect"))
        mifuncioncambiarcel(leerInput("celular"))
    }
    function CrearLote ():void {
		setIdLote(generarCodigo())
		console.log(nombreCaficultor)
		console.log(idLote)
        console.log(selectedVariedad)
        console.log(selectedMunicipio)
        console.log(numeroCel)
      }
      /*const handleMunicipioChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const municipioId = parseInt(event.target.value);
        const selectedMun = municipiosCauca.find(mun => mun.id === municipioId);
        setSelectedMunicipio(selectedMun || null);
        console.log(selectedMunicipio?.nombre)
      };*/
      //<InputTexto nombre="Nombre de caficultor:" Id="NombreCaficultor"/>
    return(
        <body className="body-Lote">
            <header className="header">
                <img src= {logo} alt="logo-caucafe"></img>
            </header>
            <section className="field">
        <div className="campoRegistroLote">
            <div className="divLabel">
            <label htmlFor="Nom</div>breCaficultor"> Nombre de caficultor </label> </div>
            <input type="text" className="input-text" name="NombreCaficultor" id={"NombreCaficultor"} onChange={cambiarLote}/> <br></br>
        </div>
        <div className="campoRegistroLote">
            <div className="divLabel"><label htmlFor="celular">Telefono</label></div>
            <input type="tel" id ="celular"   pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" placeholder="Ej: 316-111-2222" onChange={cambiarLote} className="input-text"></input>
        </div>
        <div className="campoRegistroLote">
           <div className="divLabel"> <label>Municipio de Cultivo:  </label></div>
            <select id= "MunicipioSelect" onChange={cambiarLote} className="input-text">
                <option value={0}>Selecciona un municipio</option>
                {municipiosCauca.map(mun => (
                <option key={mun.id} value={mun.nombre}>{mun.nombre}</option>
                ))}
            </select>
        </div>
        <div className="campoRegistroLote">
            <div className="divLabel"><label>Variedad del Lote</label></div>
            <select  id="variedadLote" onChange={cambiarLote} className="input-text">
                <option>Seleccione</option>
                {variedadesCafe.map(vari => ( <option key={vari.id}>{vari.nombre}</option>)
                    )}
            </select>
        </div>
        <div className="campoBoton">
		<button onClick ={CrearLote} className="botonGuardar">Generar</button>
        </div>
    <div className="bottomRegistro">
        <h3> Codigo de Lote: {idLote}</h3>
        <h4>Entradas: {entradasValidas}</h4>
		<div className="siguiente">
            <h2>
                <Link to = {`/${siguiente}`}
                state= {{data:{
                    ID: idLote,
                    NombreCaficultor:nombreCaficultor,
                    Municipio: selectedMunicipio,
                    Variedad: selectedVariedad
                }}} > Siguiente </Link>
            </h2>
            
        </div>
        </div>
        </section>
       
        <div>
            <h4>El nombre escrito es: {nombreCaficultor}</h4>
            <h4>El numero escrito es: {numeroCel}</h4>
            <h4>El municipio seleccionado es: {selectedMunicipio}</h4>
            
        </div>
        </body>
    )
}