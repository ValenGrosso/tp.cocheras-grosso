export interface Estacionamiento {
    id: number;
    patente: string;
    horaIngreso: string;
    horaEgreso: string|null
    costo: number|null
    idUsuariosIngreso: string;
    idUsuariosEgreso: string|null;
    idCochera: number;
    eliminado: null;
}