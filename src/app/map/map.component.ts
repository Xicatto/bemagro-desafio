import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private map: any;

  private async initMap() {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: 'Milano' });

    this.map = L.map('map', {
      center: [results[0].y, results[0].x],
      zoom: 15,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }
  constructor() {}

  ngAfterViewInit(): void {
    this.initMap();
  }
}
