import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoodsInfo, DEFAULT_GOODS_PLACEHOLDER } from 'src/app/domain';
import { GoodsInfoLoaderService } from './goods-info-loader.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements AfterViewInit {
  public goods: GoodsInfo[] = [];
  public isGoodsInfoWindowShown: boolean = false;
  public selectedGoods: GoodsInfo | null = null;

  private gallery: HTMLElement | null = null;
  private readonly GOODS_PER_LOAD = 5;
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


  ngAfterViewInit(): void {
    this.gallery = document.getElementById("gallery")
    
    document.addEventListener("scroll", () => {
      this.onScroll();
    });

    setTimeout(() => {
      this.initGoods();
    }, 0);
  }

  private onScroll() {
    if (!this.gallery) return;

    if (this.isCameraTouchedBottom()) {
      this.goods = this.goodsLoader.getAnotherGoodsInfos(this.GOODS_PER_LOAD);
    }
  }

  private initGoods() {
    if (!this.gallery) return;

    if (this.isCameraTouchedBottom()) {
      setTimeout(() => {
        this.onScroll();
        this.initGoods();
      }, 0)
    }
  }

  private isCameraTouchedBottom(): boolean {
    if (!this.gallery) return false;

    return (this.gallery.offsetHeight + this.gallery.offsetTop <= window.scrollY + window.innerHeight + this.SCROLL_LOADING_GAP);
  }
}
