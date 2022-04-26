import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GoodsInfo } from 'src/app/domain';

@Component({
  selector: 'app-selected-goods-form-container',
  templateUrl: './selected-goods-form-container.component.html',
  styleUrls: ['./selected-goods-form-container.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectedGoodsFormContainerComponent),
      multi: true
    }
  ]
})
export class SelectedGoodsFormContainerComponent implements ControlValueAccessor {
  private goodsInfo: GoodsInfo | null = null;
  private onChange(goodsInfo: GoodsInfo | null) {};
  private onTouched() {};

  writeValue(newGoodsInfo: GoodsInfo | null): void {
    this.goodsInfo = newGoodsInfo;
    this.onChange(this.goodsInfo);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
