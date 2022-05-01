import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsInfoWindowComponent } from './goods-info-window.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularYandexMapsModule } from 'angular8-yandex-maps';
import { MapComponent } from './map/map.component';
import { SharedModule } from '../shared/shared.module';
import { IfFieldInvalidDirective } from './purchase-form/if-field-invalid.directive';

@NgModule({
  declarations: [
    GoodsInfoWindowComponent,
    PurchaseFormComponent,
    MapComponent,
    IfFieldInvalidDirective
  ],
  exports: [
    GoodsInfoWindowComponent,
    MapComponent,
    IfFieldInvalidDirective
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
