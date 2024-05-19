import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";
import { UserInfoDTO } from '../dto/user-info-dto';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor(private router: Router) { }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

//   Para verificar en cualquier momento si estamos logueados o no
  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(["/"]);
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(["/login"]);
  }

  public decodePayload(token: string): any {
    const payload = token!.split(".")[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }
  
  // public getCodigo(): string {
  //   const token = this.getToken();
  //   if (token) {
  //     const values = this.decodePayload(token);
  //     return values.id;
  //   }
  //   return "";
  // }

  // public getNombre(): string {
  //   const token = this.getToken();
  //   if (token) {
  //     const values = this.decodePayload(token);
  //     return values.nombre;
  //   }
  //   return "";
  // }

  //Con la funcion getAllTokenData simplifico la creacion de funciones para obtener datos separados
  public getAllTokenData(): UserInfoDTO {
    const token = this.getToken(); // Asume que getToken devuelve el token JWT
    if (token) {
      const decodedValues = this.decodePayload(token); // Usa decodePayload para obtener el payload decodificado
      return new UserInfoDTO(decodedValues.id, decodedValues.nombre, decodedValues.rol, decodedValues.sub);
    }
    return new UserInfoDTO('', '', '', ''); // Retorna un nuevo UserInfoDTO vacío si no hay token
  }
  
}