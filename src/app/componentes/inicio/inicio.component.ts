import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';
import { NegociosService } from '../../servicios/negocios.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  constructor(private mapaService: MapaService, private router: Router, private negociosService: NegociosService) { }
  
  ngOnInit(): void {
    this.mapaService.crearMapa(); // Asegúrate de que el mapa se crea primero
  }


  public iraBusqueda(valor:string){
    if(valor){
      this.router.navigate(["/busqueda", valor]);
    }
  }
}