import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Coordinates, StreetAddress } from 'src/app/domain';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input()
  public markers: StreetAddress[] = [];

  @Input()
  public lockControls: boolean = false;

  @Input()
  public center: Coordinates = {
    latitude: 55.751952,
    longitude: 37.600739
  }

  @Output()
  public onMarkerSelected = new EventEmitter<StreetAddress>();

  public mapOptions: ymaps.IMapOptions = {};

  public mapState: ymaps.IMapState = {};

  public onMarkerClick(e: StreetAddress) {
    this.onMarkerSelected.emit(e);
  }

  ngOnInit(): void {
    if (this.lockControls) {
      this.mapState = {
        controls: ["zoomControl"]
      }
    }
  }
}