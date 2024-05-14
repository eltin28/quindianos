import { Component, OnInit, Inject } from '@angular/core';
import { RegistroClienteDTO } from '../../dto/registro-cliente-dto';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [FormsModule, FontAwesomeModule],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  container: HTMLElement | null = null;
  registroClienteDTO: RegistroClienteDTO;
  archivos!:FileList;
  showPassword = false;
  activeIcon = 'fa-eye'; // Inicialmente, el icono de ojo abierto está activo

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.registroClienteDTO = new RegistroClienteDTO();
  }

  public sonIguales(): boolean {
    return this.registroClienteDTO.password == this.registroClienteDTO.confirmaPassword;
  }

  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      this.registroClienteDTO.fotoPerfil = this.archivos[0].name;
    }
  }

  public registrar() {
    if (this.registroClienteDTO.fotoPerfil != "") {
      console.log(this.registroClienteDTO);
    } else {
      console.log("Debe cargar una foto");
    }
  }

  ngOnInit(): void {
    this.container = this.document.getElementById('container'); // Get container reference

    if (this.container) {
      const signUpButton = this.document.getElementById('signUp');
      const signInButton = this.document.getElementById('signIn');

      if (signUpButton && signInButton) {
        signUpButton.addEventListener('click', () => this.togglePanel('right'));
        signInButton.addEventListener('click', () => this.togglePanel('left'));
      }
    }
  }

  togglePanel(direction: 'left' | 'right'): void {
    if (!this.container) {
      return;
    }
    this.container.classList.toggle('right-panel-active');
  }

  togglePasswordVisibility() {
    this.showPassword =!this.showPassword;
    this.activeIcon = this.activeIcon === 'fa-eye'? 'fa-eye-slash' : 'fa-eye'; // Cambia el icono activo
  }
}