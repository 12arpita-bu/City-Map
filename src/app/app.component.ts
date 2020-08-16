import { Component, OnInit } from '@angular/core';
import { DataService } from './data-service.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'CityMap';
  regionData: any;
  markers = [];
  zoom = 2;
  constructor(
    private dataService: DataService) { }

  ngOnInit() {
    this.dataService.mapData$.subscribe(res => {
      this.regionData = res;
      this.addMarker();
    });
  }

  addMarker() {
    if (this.markers.length) {
      this.markers = [];
    }
    for (const row of this.regionData) {
      if (!row.disabled && row.name && row.volume) {
        this.markers.push({
          position: {
            lat: +row.latitude,
            lng: +row.longitude,
          },
          label: {
            color: 'red',
            text: row.name,
          },
          title: row.volume,
          info: 'Marker info ' + (this.markers.length + 1),
          options: {
            animation: google.maps.Animation.BOUNCE,
          },
        });
      }
    }
  }
}
