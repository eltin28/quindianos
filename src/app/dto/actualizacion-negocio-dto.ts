import { Horario } from "./horario";
import { Ubicacion } from "./ubicacion";

export class ActualizacionNegocioDTO {
    constructor(
        public codigoNegocio: string,
        public nombreNegocio: string,
        public descripcion: string,
        public tipoNegocio: string,
        public imagenes: string[],
        public horarios: Horario[],
        public telefonos: string[],
        public ubicacion: Ubicacion

    ){}
}
