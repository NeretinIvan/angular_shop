import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsInfoWindowComponent } from './goods-info-window.component';
import { PurchaseFormComponent } from './purchase-form/purchase-form.component';
import { SelectedGoodsFormContainerModule } from './purchase-form/selected-goods-form-container/selected-goods-form-container.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    GoodsInfoWindowComponent,
    PurchaseFormComponent
  ],
  exports: [
    GoodsInfoWindowComponent
  ],
  imports: [
    CommonModule,
    SelectedGoodsFormContainerModule,
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class GoodsInfoWindowModule { }
