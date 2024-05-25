import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../servicios/negocios.service';
import { MapaService } from '../../servicios/mapa.service';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-busqueda',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './busqueda.component.html',
  styleUrl: './busqueda.component.css'
})
export class BusquedaComponent {

  textoBusqueda: string;
  resultados: ItemNegocioDTO[];

  constructor(private route: ActivatedRoute, private negociosService: NegociosService, private mapaService: MapaService) {
    this.resultados = [];
    this.textoBusqueda = "";
  }
  
  ngOnInit(): void {
  this.mapaService.crearMapa();
  this.mapaService.pintarMarcadores(this.resultados);
  }

  public listarNegocios(){
  
    this.route.params.subscribe(params => {
      this.textoBusqueda = params['texto'];
      this.negociosService.buscar(this.textoBusqueda).subscribe({
        next: (data) => {
          this.resultados = data.respuesta;
          console.log("palabra", this.textoBusqueda)
        },
        error: (error) => {
          console.error(error);
        }
      });
    })
  }
}