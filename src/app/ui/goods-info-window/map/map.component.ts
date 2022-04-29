import { Component, EventEmitter, Input, Output } from '@angular/core';
import { StreetAddress } from 'src/app/domain';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input()
  public markers: StreetAddress[] = [];

  @Output()
  public onMarkerSelected = new EventEmitter<StreetAddress>();

  public onMarkerClick(e: StreetAddress) {
    this.onMarkerSelected.emit(e);
  }
}