import { Component, Input } from '@angular/core';
import { StreetAddress } from 'src/app/domain';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input()
  public markers: StreetAddress[] = [];

  public onMarkerClick(e: any) {
    console.log(this.markers);
  }
}