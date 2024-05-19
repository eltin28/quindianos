import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistroClienteDTO } from '../dto/registro-cliente-dto';
import { LoginDTO } from '../dto/login-dto';
import { MensajeDTO } from '../dto/mensaje-dto';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authURL = "http://localhost:8080/api/auth";


  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private nombreUsuarioSubject = new BehaviorSubject<string>('');
  nombreUsuario$ = this.nombreUsuarioSubject.asObservable();


  constructor(private http: HttpClient, private tokenService: TokenService) { }

  public registrarCliente(cliente: RegistroClienteDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/registrar-cliente`, cliente);
  }

  public loginCliente(loginDTO: LoginDTO): Observable<MensajeDTO> {
    return this.http.post<MensajeDTO>(`${this.authURL}/login-cliente`, loginDTO).pipe(
      tap(() => {
        this.isAuthenticatedSubject.next(true);
        const userInfo = this.tokenService.getAllTokenData();
        this.nombreUsuarioSubject.next(userInfo.nombre); // Actualiza el nombre del usuario
        }),
      catchError(error => {
        this.isAuthenticatedSubject.next(false);
        this.nombreUsuarioSubject.next('');
        throw error;
      })
    );
  }
}