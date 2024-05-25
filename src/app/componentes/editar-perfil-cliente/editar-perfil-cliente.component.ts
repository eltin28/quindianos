import { Component } from '@angular/core';
import { UserInfoDTO } from '../../dto/user-info-dto';
import { TokenService } from '../../servicios/token.service';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-editar-perfil-cliente',
  standalone: true,
  imports: [],
  templateUrl: './editar-perfil-cliente.component.html',
  styleUrl: './editar-perfil-cliente.component.css'
})
export class EditarPerfilClienteComponent {

  cliente: UserInfoDTO;

  constructor(private tokenService: TokenService, private authService: AuthService, private router: Router){
    this.cliente = new UserInfoDTO();
  }

  ngOnInit(): void {
    this.cliente = this.tokenService.getAllTokenData();
  }

  public eliminar() {
    const clienteId = this.tokenService.getAllTokenData().id;
    this.authService.eliminarUsuario(clienteId).subscribe(
      (response) => {
        console.log(response);
        this.limpiarSesionYNavbar();
      },
      (error) => {
        console.error(error); 
      }
    );
  }
  
  private limpiarSesionYNavbar() {
    this.tokenService.logout();
  
    this.router.navigate(['/inicio']).then(() => {
      window.location.reload();
    });
  }
  
}
