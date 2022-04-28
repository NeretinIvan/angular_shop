import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DEFAULT_GOODS_PLACEHOLDER, GoodsInfo, StreetAddress } from 'src/app/domain';

@Component({
  selector: 'app-goods-info-window',
  templateUrl: './goods-info-window.component.html',
  styleUrls: ['./goods-info-window.component.scss']
})
export class GoodsInfoWindowComponent {
  @Input()
  public goodsInfo: GoodsInfo = DEFAULT_GOODS_PLACEHOLDER;

  @Output()
  public infoWindowClosed = new EventEmitter();

  public isPurchaseFormShown: boolean = false;

  public onBackgroundClick(e: Event): void {
    this.infoWindowClosed.emit();
  }

  public onWindowClick(e: Event): void {
    e.stopPropagation();
  }

  public showPurchaseForm(): void {
    this.isPurchaseFormShown = true;
  }

  public hidePurchaseForm(): void {
    this.isPurchaseFormShown = false;
  }

  public getAddresses(): StreetAddress[] {
    if (this.goodsInfo.addresses) return this.goodsInfo.addresses;
    return [];
  }
}
