export type defectoFisico = {
    nombreDefecto: string;
    peso?: number;
    porcentaje: number;
};
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
  
export type SCAbox = {
    index:number;
    value: boolean;
}
export type puntajeSCA =
    6 | 6.25 | 6.5 | 6.75 | 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10;

export type SCAboxList =  [SCAbox,SCAbox,SCAbox,SCAbox,SCAbox]
export type AnalisisFisico = {
    defectos?: defectoFisico[];
    factordeRendimiento?: number;
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
