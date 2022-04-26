import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsInfoWindowComponent } from './goods-info-window.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';


@NgModule({
  declarations: [
    GoodsInfoWindowComponent,
    PurchaseFormComponent
  ],
  exports: [
    GoodsInfoWindowComponent
  ],
  imports: [
    CommonModule
  ]
})
export class GoodsInfoWindowModule { }
