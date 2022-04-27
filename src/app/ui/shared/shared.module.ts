import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShortenNamePipe } from './shorten-name.pipe';
import { PricePipe } from './price.pipe';

@NgModule({
  declarations: [
    ShortenNamePipe,
    PricePipe
  ],
  exports: [
    ShortenNamePipe,
    PricePipe
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
