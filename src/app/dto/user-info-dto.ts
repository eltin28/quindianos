export class UserInfoDTO {
    constructor(
        public id: string = '',
        public nombre: string = '',
        public nickname: string = '',
        public fotoPerfil: string = '',
        public ciudadResidencia: string = '',
        public rol: string = '',
        public sub: string = '',
        public email: string = '',
    ){}
}
