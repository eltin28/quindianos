type LocalTime = string;

export class Horario {
    constructor(
        public dia: string = '',
        public horaApertura: LocalTime = '',
        public horaCierre: LocalTime = '',
    ) {}
}