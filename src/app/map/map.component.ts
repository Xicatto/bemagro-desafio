import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import * as L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { User } from '../interfaces/user';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  private map: any;
  @Input() user!: User;

  private async initMap() {
    const provider = new OpenStreetMapProvider();
    const results = await provider.search({ query: this.user.location });

    this.map = L.map('map', {
      center: [results[0].y, results[0].x],
      zoom: 10,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    L.circle([results[0].y, results[0].x], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.2,
      radius: 5000,
    }).addTo(this.map);
  }
  constructor() {}

  ngAfterViewInit() {
    this.initMap();
  }
}
