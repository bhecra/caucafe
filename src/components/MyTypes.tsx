export type defectoFisico = {
    nombreDefecto: string;
    peso?: number;
    porcentaje: number;
};
export type SCAbox = {
    index:number;
    value: boolean;
}
export type puntajeSCA =
    | 7 | 7.25 | 7.5 | 7.75 | 8 | 8.25 | 8.5 | 8.75 | 9 | 9.25 | 9.5 | 9.75 | 10;

export type SCAboxList =  [SCAbox,SCAbox,SCAbox,SCAbox,SCAbox]
export type AnalisisFisico = {
    defectos?: defectoFisico[];
    factordeRendimiento?: number;
}
export  type CatacionLote = {
    id: number;
    codigo?: string;
    codigoLote?:string;
    catador?: string;
    InfoView: boolean;
    InfoClass?: "InfoVisible" | "InfoInvisible"
    acidez?: number;
    altura?: number;
    balance?: number;
    cuerpo?: number;
    fragancia?: puntajeSCA;
    intensidad?: number;
    mojado?: number;
    nivel?: number;
    proceso?: string;
    puntajeCatador?: number;
    residual?: number;
    sabor?: number;
    seco?: number;
    dulzor: SCAboxList;
    dulzorScore?: number;
    tazaLimpia: SCAboxList;
    tazaLimpiaScore?:number;
    uniformidad: SCAboxList;
    uniformidadScore?: number;
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
