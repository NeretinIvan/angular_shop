import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsInfoWindowComponent } from './goods-info-window.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GoodsInfoWindowComponent,
    PurchaseFormComponent,
    MapComponent
  ],
  exports: [
    GoodsInfoWindowComponent,
    MapComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    AngularYandexMapsModule,
    SharedModule
  ]
})
export class GoodsInfoWindowModule { }
