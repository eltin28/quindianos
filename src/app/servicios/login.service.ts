import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private apiUrl = 'https://tu-api-url.com'; // Reemplaza esto con la URL de tu API

 constructor(private http: HttpClient) { }

 registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
 }

 loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
 }
}
