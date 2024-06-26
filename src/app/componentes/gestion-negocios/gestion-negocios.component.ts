import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../dto/item-negocio-dto';
import { NegociosService } from '../../servicios/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../servicios/token.service';

@Component({
    selector: 'app-gestion-negocios',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './gestion-negocios.component.html',
    styleUrl: './gestion-negocios.component.css'
})

export class GestionNegociosComponent {
    negocios: ItemNegocioDTO[];
    seleccionados: ItemNegocioDTO[];
    textoBtnEliminar : string;

    constructor(private negocioService: NegociosService, private tokenService: TokenService) {
        this.negocios = [];
        this.seleccionados = []; 
        this.textoBtnEliminar = ''; 
        this.listarNegocios();
    }

    public listarNegocios(){
        const codigoCliente = this.tokenService.getAllTokenData().id;
        this.negocioService.listarNegociosPropietario(codigoCliente).subscribe({
            next: (data) => {
                this.negocios = data.respuesta;
            },
            error: (error) => {
                console.error(error);
            }
        });
    }

    public seleccionar(producto: ItemNegocioDTO, estado: boolean) {
        if (estado) {
            this.seleccionados.push(producto);
        } else {
            this.seleccionados.splice( this.seleccionados.indexOf(producto), 1 );
        }
        this.actualizarMensaje();
    }

    private actualizarMensaje() {
        const tam = this.seleccionados.length;

        if (tam != 0) {
            if (tam == 1) {
                this.textoBtnEliminar = "1 elemento";
            } else {
                this.textoBtnEliminar = tam + " elementos";
            }
        } else {
        
        this.textoBtnEliminar = "";
        }
    }

    public borrarNegocios() {
        this.seleccionados.forEach(n => {
            this.negocioService.eliminar(n.codigoNegocio);
            this.negocios = this.negocios.filter(negocio => negocio.codigoNegocio !== n.codigoNegocio);
        });
        
        this.seleccionados = [];
        this.actualizarMensaje();
    }

}