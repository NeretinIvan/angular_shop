import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryComponent } from './gallery.component';
import { GoodsCardComponent } from './goods-card/goods-card.component';

import { GoodsInfoWindowModule } from '../goods-info-window/goods-info-window.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    GalleryComponent,
    GoodsCardComponent
  ],
  exports: [
    GalleryComponent
  ],
  imports: [
    CommonModule,
    GoodsInfoWindowModule,
    SharedModule
  ]
})
export class GalleryModule { }
