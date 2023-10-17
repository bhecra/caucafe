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
export type Mallas =  {[numero: number]:{weight:number, pc:number, weightA:number, pcA:number}}

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
    {id:1, name: 'Otros grupo 1', group: 1 },
    {id:2, name: 'Otros grupo 2', group: 2 },
    {id:3, name: 'Negro parcial', group: 1 },
    {id:4, name: 'Negro total', group: 1 },
    {id:5, name: 'Cardenillo', group: 1 },
    {id:6, name: 'Vinagre', group: 1 },
    {id:7, name: 'Cristalizado', group: 1 },
    {id:8, name: 'Decolorado-Reposado', group: 1 },
    {id:9, name: 'Decolorado-Mantequillo', group: 1 },
    {id:10, name: 'Decolorado-sobresecado', group: 1 },
    {id:11, name: 'Mordido', group: 2 },
    {id:12, name: 'Brocado leve', group: 1 },
    {id:13, name: 'Brocado severo', group: 1 },
    {id:14, name: 'Averanado/Arrugado', group: 1 },
    {id:15, name: 'Inmaduro/Paloteado', group: 1 },
    {id:16, name: 'Aplastado', group: 1 },
    {id:17, name: 'Flojo', group: 1 },

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
    excelso:number
    defects: samplePhysicalDefect[]
    defectsWeight: number
    group1DefectsWeight:number
    group2DefectsWeight:number
    factordeRendimiento: number
    Merma?: number
    pcMerma?:number
    trilla?:number
    pcDefects?:number
    density?: number
    mallas: Mallas
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
    fragancia: puntajeSCA;
    fraganciaA?: string;
    intensidad?: number;
    mojado?: number;
    nivel?: number;
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
    notas?: string;
}
export const EMPTY_CUPPING:CatacionLote = {
    id: 0,
    dulzor: [
        { index: 1, value: true },
        { index: 2, value: true },
        { index: 3, value: true },
        { index: 4, value: true },
        { index: 5, value: true },
    ],
    uniformidad: [
        { index: 1, value: true },
        { index: 2, value: true },
        { index: 3, value: true },
        { index: 4, value: true },
        { index: 5, value: true },
    ],
    tazaLimpia: [
        { index: 1, value: true },
        { index: 2, value: true },
        { index: 3, value: true },
        { index: 4, value: true },
        { index: 5, value: true },
    ],
    defectsList: [],
    uniformidadScore: 10,
    dulzorScore: 10,
    tazaLimpiaScore: 10,
    InfoView: false,
    InfoClass: "InfoInvisible",
    SCAdefectsQty: 0,
    SCAdefects: 0,
    fragancia: 6,
    sabor: 6,
    residual: 6,
    acidez: 6,
    cuerpo: 6,
    balance: 6,
    puntajeCatador: 6,
    finalScore: 0,
    defectsIntesity: 2
}
export const EMPTY_ANALISIS:AnalisisFisico ={
    sampleWeight: 250,
    defects: [],
    defectsWeight: 0,
    excelso: 200,
    factordeRendimiento:100,
    group1DefectsWeight:0,
    group2DefectsWeight:0,
    mallas:{
    }
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
    cupping: CatacionLote;
    analysis: AnalisisFisico;
    ANALYSYS: boolean;
    CUPPING: boolean;
}
