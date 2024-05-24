import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { CommonModule } from '@angular/common';
import { TokenService } from '../../servicios/token.service';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  nombre = ''; 
  title = 'Unilocal';
  isLogged = false;
  mostrarMenu = false;

  toggleMenu() {
    console.log('Toggling menu');
    this.mostrarMenu = this.mostrarMenu === false?true:false;
  }

  constructor(private authService: AuthService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.isLogged = this.tokenService.isLogged();
    if (this.isLogged) {
        this.nombre = this.tokenService.getAllTokenData().nombre;
    }
  }

  public logout() {
    console.log("Intenta")
    this.tokenService.logout();
  }

}
