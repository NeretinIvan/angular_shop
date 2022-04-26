import { Component, Input, Output, EventEmitter } from '@angular/core';
import { GoodsInfo, DEFAULT_GOODS_PLACEHOLDER } from 'src/app/domain';

@Component({
  selector: 'app-goods-card',
  templateUrl: './goods-card.component.html',
  styleUrls: ['./goods-card.component.scss']
})
export class GoodsCardComponent {
  @Input()
  public goodsInfo: GoodsInfo = DEFAULT_GOODS_PLACEHOLDER;

  @Output()
  public onCardSelected = new EventEmitter<GoodsInfo>();

  public onCardClick() {
    this.onCardSelected.emit(this.goodsInfo)
  }
}
