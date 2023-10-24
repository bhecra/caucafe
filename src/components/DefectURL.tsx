type URL = {id:number, URL:string}
const cURLList:URL[]=[
    { id: 1, URL: 'Acidez excesiva' },
    { id: 2, URL: 'Amargura intensa' },
    { id: 3, URL: 'Agrio' },
    { id: 4, URL: 'Fermento/Vinagre' },
    { id: 5, URL: 'Ceniza' },
    { id: 6, URL: 'Acre' },
    { id: 7, URL: 'Falta de cuerpo' },
    { id: 8, URL: 'Insípido' },
    { id: 9, URL: 'Fenol' },
    { id: 10, URL: 'Humedad' },
    { id: 11, URL: 'Combustible' },
    { id: 12, URL: 'Metálico' },
    { id: 13, URL: 'Nueces rancias' },
    { id: 14, URL: 'Reposo' },
    { id: 15, URL: 'Terroso' },
    { id: 16, URL: 'Moho' },
    { id: 17, URL: 'Aspero' },
    { id: 18, URL: 'Cereal' },
    { id: 19, URL: 'Metálico' },
    { id: 20, URL: 'Ahumado' },
]

const pURLList:URL[] =[
    {id:1, URL: 'Otros grupo 1'},
    {id:2, URL: 'Otros grupo 2'},
    {id:3, URL: 'Negro parcial'},
    {id:4, URL: 'https://www.youtube.com/watch?v=pQWnFMNyebw'},
    {id:5, URL: 'Cardenillo'},
    {id:6, URL: 'Vinagre'},
    {id:7, URL: 'Cristalizado'},
    {id:8, URL: 'Decolorado-Reposado'},
    {id:9, URL: 'Decolorado-Mantequillo'},
    {id:10, URL: 'Decolorado-sobresecado'},
    {id:11, URL: 'Mordido'},
    {id:12, URL: 'Brocado leve'},
    {id:13, URL: 'Brocado severo'},
    {id:14, URL: 'Averanado/Arrugado'},
    {id:15, URL: 'Inmaduro/Paloteado'},
    {id:16, URL: 'Aplastado'},
    {id:17, URL: 'Flojo'},
]
export function pDefectURL(id:number):string{
    let URL:string=''
    pURLList.forEach((element) => {
        if(element.id===id){
            URL='. ¿Cómo corregir este defecto?: ' + element.URL
        } 
    });
    return URL 
}

export function cDefectURL(id:number):string{
    let URL:string=''
    cURLList.forEach((element) => {
        if(element.id===id){
            URL='. ¿Cómo corregir este defecto?: ' + element.URL
        } 
    });
    return URL 
}