import { Component } from '@angular/core';
import { RegistroNegocioDTO } from '../../dto/registro-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../dto/horario';
import { MapaService } from '../../servicios/mapa.service';
import { PublicoService } from '../../servicios/publico.service';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})

export class CrearNegocioComponent {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  lineCount: number = 0; // Contador para el número total de líneas
  lastIndex: number = 0;
  archivos!:FileList;
  negocios:string[];

  constructor(private negociosService: NegociosService, private mapaService: MapaService, private publicoService: PublicoService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [ new Horario() ];
    this.negocios = [];
    this.tipoNegocio();
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    this.negociosService.crear(this.registroNegocioDTO);
    console.log(this.registroNegocioDTO);
  }
  
  public agregarHorario() {
    if (this.lineCount < 7) {
      const newHorario: Horario = new Horario();
      this.horarios.push(newHorario);
      this.lastIndex = this.horarios.length - 1; // Actualiza el índice del último horario agregado
      this.lineCount++;
    } else {
      alert('No se pueden agregar más horarios.');
    }
  }
  
  public eliminarHorario(index: number) {
    if (this.horarios.length > 0 && index >= 0) {
      this.horarios.splice(index, 1);
      this.lineCount--; // Decrementa el contador de líneas
    } else {
      alert('No hay horarios para eliminar o el índice proporcionado es inválido.');
    }
  }

  addPhoneNumber() {
    this.registroNegocioDTO.telefonos.push('');
  }

  public eliminarTelefono(index: number) {
    if (this.registroNegocioDTO.telefonos.length > 0 && index >= 0) {
      this.registroNegocioDTO.telefonos.splice(index, 1);
    } else {
      alert('No hay teléfonos para eliminar o el índice proporcionado es inválido.');
    }
  }
  
  
  
  public onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.archivos = event.target.files;
      if (!this.registroNegocioDTO.imagenes) {
        this.registroNegocioDTO.imagenes = [];
      }
      for (let i = 0; i < this.archivos.length; i++) {
        this.registroNegocioDTO.imagenes.push(this.archivos[i].name);
      }
    }
  }
  
  private tipoNegocio() {
    this.publicoService.listarTiposNegocio().subscribe({
      next: (data) => {
        this.negocios = data.respuesta;
      },
      error: (error) => {
        console.log("Error al cargar los tipos de negocios")
      }
    })
  }
  
}