import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { LoginDTO } from '../dto/login-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { ActualizacionUsuarioDTO } from '../dto/actualizacion-usuario-dto';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "https://quindianoback.onrender.com/api/auth";

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, loginDTO)
  }

  public actualizarUsuario(actualizacionUsuario: ActualizacionUsuarioDTO): Observable<MensajeDTO> {
    return this.http.put<MensajeDTO>(`${this.authURL}/actualizar`, actualizacionUsuario);
  }

  public eliminarUsuario(codigoUsuario: string): Observable<MensajeDTO> {
    return this.http.delete<MensajeDTO>(`https://quindianoback.onrender.com/api/clientes/eliminar/${codigoUsuario}`);
  }
}