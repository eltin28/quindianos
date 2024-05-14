import { format } from 'date-fns';

// Define un tipo personalizado para LocalTime
type LocalTime = string;

export class Horario {
    constructor(
        public horaApertura: LocalTime = '',
        public horaCierre: LocalTime = '',
    ) {}
}
