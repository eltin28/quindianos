import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
selector: 'app-gestion-negocios',
standalone: true,
imports: [CommonModule, RouterModule],
templateUrl: './gestion-negocios.component.html',
styleUrl: './gestion-negocios.component.css'
})
export class GestionNegociosComponent {
negocios: ItemNegocioDTO[];
constructor(private negocioService: NegociosService) {
this.negocios = [];
this.listarNegocios();
}
public listarNegocios(){
this.negocios = this.negocioService.listar();
}
}