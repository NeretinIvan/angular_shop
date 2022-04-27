import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoodsInfo, DEFAULT_GOODS_PLACEHOLDER } from 'src/app/domain';
import { GoodsInfoLoaderService } from './goods-info-loader.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit {
  public goods: (GoodsInfo | null)[] = [];
  public isGoodsInfoWindowShown: boolean = false;
  public selectedGoods: GoodsInfo | null = null;

  private gallery: HTMLElement | null = null;
  private readonly GOODS_PER_LOAD = 1;
  private readonly SCROLL_LOADING_GAP = 100;

  constructor(private goodsLoader: GoodsInfoLoaderService,
              private element: ElementRef<HTMLElement>) {
  }

  public showGoodsInfoWindow(): void {
    this.isGoodsInfoWindowShown = true;
  }

  public hideGoodsInfoWindow(): void {
    this.isGoodsInfoWindowShown = false;
  }

  public onCardSelected(goodsInfoReceived: GoodsInfo): void {
    this.showGoodsInfoWindow();
    this.selectedGoods = goodsInfoReceived;
  }

  public getSelectedGoods(): GoodsInfo {
    if (this.selectedGoods === null) return DEFAULT_GOODS_PLACEHOLDER;
    return this.selectedGoods;
  }


  public loadAdditionalGoodsCards(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.goods = new Array(...this.goods, ...new Array(amount).fill(null));
      this.goodsLoader.getGoodsInfos(this.GOODS_PER_LOAD).then((value: GoodsInfo[]) => {
        this.goods = new Array(...removeNullsFromArray(this.goods, amount), ...value);
        resolve();
      })
    })
  }

  ngAfterViewInit(): void {
    this.gallery = document.getElementById("gallery")
    
    document.addEventListener("scroll", () => {
      this.onScroll();
    });

    setTimeout(() => {
      this.initGoods();
    }, 0);
  }

  private async onScroll() {
    if (!this.gallery) return;

    if (this.isCameraTouchedBottom()) {
      await this.loadAdditionalGoodsCards(this.GOODS_PER_LOAD);
    }
  }

  private initGoods() {
    if (!this.gallery) return;

    if (this.isCameraTouchedBottom()) {
      setTimeout(() => {
        this.onScroll().then(() => {
          this.initGoods();
        });
      }, 0)
    }
  }

  private isCameraTouchedBottom(): boolean {
    if (!this.gallery) return false;

    return (this.gallery.offsetHeight + this.gallery.offsetTop <= window.scrollY + window.innerHeight + this.SCROLL_LOADING_GAP);
  }
}

function removeNullsFromArray<T>(array: Array<T | null>, amount: number): Array<T | null> {
  let count = 0;
  return array.filter((value: T | null) => {
    if (value === null) count++;
    return (value != null) || (count > amount);
  })
}