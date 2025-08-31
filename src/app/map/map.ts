import { Component, OnInit } from '@angular/core';
import mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css'
})
export class Map implements OnInit {
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;

  ngOnInit() {
    // Configurar Mapbox
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGV4YW1wbGUifQ.example'; // Token de ejemplo

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40],
      zoom: 9
    });

    // Crear marker
    this.marker = new mapboxgl.Marker()
      .setLngLat([-74.5, 40])
      .addTo(this.map);

    // Crear popup
    const popup = new mapboxgl.Popup({ offset: 25 })
      .setText('¡Has hecho click en el marker! Esta es una ubicación de ejemplo en Nueva York.');

    // Agregar popup al marker
    this.marker.setPopup(popup);

    // Evento de click en el marker
    this.marker.getElement().addEventListener('click', () => {
      this.onMarkerClick();
    });
  }

  onMarkerClick() {
    alert('¡Has hecho click en el marker! Esta es una ubicación de ejemplo en Nueva York.');
  }
}
