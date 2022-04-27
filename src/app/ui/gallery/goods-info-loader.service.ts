import { Injectable } from '@angular/core';
import { GoodsInfo } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class GoodsInfoLoaderService {
  private DEFAULT_GOODS_INFO_LOADINGS: number = 10;
  private goodsLoaded = 0;

  constructor() { }

  public getAnotherGoodsInfos(amount: number = this.DEFAULT_GOODS_INFO_LOADINGS): Promise<GoodsInfo[]> {
    this.goodsLoaded += amount;
    if (this.goodsLoaded > 50) this.goodsLoaded = 50; //delete later
    return this.getGoodsInfos(this.goodsLoaded);
  }

  public getGoodsInfos(amount: number): Promise<GoodsInfo[]> {
    //TODO: remove placeholder and make proper logic

    this.goodsLoaded++;

    let goodsLoaded = new Array<GoodsInfo>(amount);

    goodsLoaded.fill(
      {
        id: 1,
        name: 'aaa',
        price: 222,
        addresses: [
          {
            address: "aaa's address",
            coordinates: {latitude: 1, longitude: 2}
          }
        ]
      }
    )

    goodsLoaded.map((value: GoodsInfo, index: number) => {
      value.price = this.goodsLoaded;
    })

    return new Promise<GoodsInfo[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(goodsLoaded);
      }, 1000)
    })
  }

  public resetLoadedGoods(): void {
    this.goodsLoaded = 0;
  }
}
