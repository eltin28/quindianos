import { Injectable } from '@angular/core';
import { Ubicacion } from '../dto/ubicacion';
import { Observable } from 'rxjs';
import mapboxgl from 'mapbox-gl';
  
@Injectable({
    providedIn: 'root'
})

export class MapaService {

  mapa: any;
  directions: any;
  marcadores: any[];

  constructor() {
    this.marcadores = [];
  }

  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      accessToken = 'sk.eyJ1IjoianVhbmpvdGhpbiIsImEiOiJjbHZ6ajVmemkzNGJoMmlwNjJvYnd2cHMxIn0.RrFPnwqdv-7b_Skrev2YYw',
      container: 'mapa',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.309, 4.473],
      zoom: 4.5
    });

    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }


  public agregarMarcador():Observable<any> {

    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;

    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e:any) {

        marcadores.forEach(marcador => marcador.remove());

        const marcador = new mapboxgl.Marker()
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .addTo(mapaGlobal);

        marcadores.push(marcador);

        observer.next(marcador._lngLat);
      });
    });
  }

  public pintarMarcadores(negocios: ItemNegocioDTO[]) {

    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.nombre))
        .addTo(this.mapa);
    });
  }
}