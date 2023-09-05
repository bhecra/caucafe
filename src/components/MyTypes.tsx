export type defectoFisico = {
    id:number;
    name: string;
    group: 1 | 2;
};
export type samplePhysicalDefect = {
    defect: defectoFisico,
    peso:number,
    porcentaje: number,
}
export type CupDefect = {
    id:number;
    name: string;
}


export const predefinedDefects: CupDefect[] = [
    { id: 1, name: 'Acidez excesiva' },
    { id: 2, name: 'Amargura intensa' },
    { id: 3, name: 'Agrio' },
    { id: 4, name: 'Fermento/Vinagre' },
    { id: 5, name: 'Ceniza' },
    { id: 6, name: 'Acre' },
    { id: 7, name: 'Falta de cuerpo' },
    { id: 8, name: 'Insípido' },
    { id: 9, name: 'Fenol' },
    { id: 10, name: 'Humedad' },
    { id: 11, name: 'Combustible' },
    { id: 12, name: 'Metálico' },
    { id: 13, name: 'Nueces rancias' },
    { id: 14, name: 'Reposo' },
    { id: 15, name: 'Terroso' },
    { id: 16, name: 'Moho' },
    { id: 17, name: 'Aspero' },
    { id: 18, name: 'Cereal' },
    { id: 19, name: 'Metálico' },
    { id: 20, name: 'Ahumado' },
  ];
export const predefinedPhysicalDefects: defectoFisico[] = [
    {id:1, name: 'Brocado leve', group: 1 },
    {id:11, name: 'Brocado severo', group: 1 },
    {id:2, name: 'Negro parcial', group: 1 },
    {id:3, name: 'Negro total', group: 1 },
    {id:4, name: 'Vinagre', group: 1 },
    {id:5, name: 'Cardenillo', group: 1 },
    {id:6, name: 'Cereza', group: 1 },
    {id:7, name: 'Inmaduro', group: 1 },
    {id:8, name: 'Concha', group: 1 },
    {id:9, name: 'Vano', group: 1 },
    {id:10, name: 'Averanado', group: 1 }

]
export type SCAbox = {
    index:number;
    value: boolean;
}
export type puntajeSCA =
    6 | 6.25 | 6.5 | 6.75 | 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10;

export type SCAboxList =  [SCAbox,SCAbox,SCAbox,SCAbox,SCAbox]
export type AnalisisFisico = {
    sampleWeight:number
    humidity?: number
    aw?: number
    volume?:number
    excelso?:number
    defects: samplePhysicalDefect[]
    factordeRendimiento?: number
    Merma?: number
    pcDefects?:number
    density?: number
    mallas?: {numero: number, weight:number, pc:number}[]
}
export type SCAScoring = {
    
}
export  type CatacionLote = {
    id: number;
    codigo?: string;
    codigoLote?:string;
    catador?: string;
    InfoView: boolean;
    InfoClass?: "InfoVisible" | "InfoInvisible"
    acidez: number;
    acidezA?: number;
    altura?: number;
    balance: number;
    cuerpo: number;
    cuerpoA?:string;
    SCAdefects: number;
    SCAdefectsQty: number;
    defectsIntesity: number;
    defectsList: CupDefect[];
    defectsQty: number;
    fragancia: puntajeSCA;
    fraganciaA?: string;
    intensidad?: number;
    mojado?: number;
    nivel?: number;
    proceso?: string;
    puntajeCatador: number;
    finalScore:number;
    residual: number;
    residualA?:string;
    sabor: number;
    saborA?: string;
    seco?: number;
    dulzor: SCAboxList;
    dulzorScore: number;
    tazaLimpia: SCAboxList;
    tazaLimpiaScore:number;
    uniformidad: SCAboxList;
    uniformidadScore: number;
    tostion?: number;
    variedad?: string;
    notas?: string;
}
export type Lote = {
    codigo?: string;
    nombreCaficultor?: string;
    idCaficultor?: number;
    numeroCel?:number;
    municipio?: string;
    proceso?: string;
    variedad?: string;
    altura?:number;
    peso?: number;
    cupping?: CatacionLote;
    analysis?: AnalisisFisico;
}
