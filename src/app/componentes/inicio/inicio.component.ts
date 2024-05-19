import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { MapaService } from '../../servicios/mapa.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {
  constructor(private mapaService: MapaService, private router: Router) { }
  
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }

  public iraBusqueda(valor:string){
    if(valor){
      this.router.navigate(["/busqueda", valor]);
    }
  }
}