import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
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
  public isDataLoadingStopped: boolean = false;

  private gallery: HTMLElement | null = null;
  private isDataLoadingNow: boolean = false;
  
  private readonly GOODS_PER_LOAD = 2;
  private readonly SCROLL_LOADING_GAP = 100;
  private readonly CHECK_UPDATES_FREQUENCY = 1000;

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
      this.onScroll();
    }, 0);
  }

  public onLoadMoreButtonClick() {
    this.isDataLoadingStopped = false;
    this.onScroll();
  }

  public onGalleryScrolled() {
    console.log("scroll");
  }

  public async onScroll() {
    if (this.isCameraTouchesBottom()) {
      this.loadNewData().then(() => {
        this.onScroll();
      })
      .catch((reason: string) => { 
        console.log(reason) 
      });
    }
  }

  private async loadNewData() {
    if (this.isDataLoadingStopped) return new Promise((resolve, reject) => reject("loading stopped now"));

    const previousDataLoading = this.waitForPreviousDataLoading();
    await previousDataLoading;
    this.isDataLoadingNow = true;
    await this.loadAdditionalGoodsCards(this.GOODS_PER_LOAD);
    this.isDataLoadingNow = false;
    Promise.resolve(previousDataLoading);
  }

  private isCameraTouchesBottom(): boolean {
    if (!this.gallery) return false;

    return (this.gallery.offsetHeight + this.gallery.offsetTop <= window.scrollY + window.innerHeight + this.SCROLL_LOADING_GAP);
  }

  async loadAdditionalGoodsCards(amount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.goods = new Array(...this.goods, ...new Array(amount).fill(null));

      this.goodsLoader.getGoodsInfos(this.GOODS_PER_LOAD)
      .then((value: (GoodsInfo)[]) => {
        this.goods = new Array(...getArrayWithoutNulls(this.goods), ...value, ...getNullsFromArray(removeNullsFromArray(this.goods, amount)));
        resolve();
      }).catch((reason: string) => {
        console.log(reason);
        this.isDataLoadingStopped = true;
        this.goods = getArrayWithoutNulls(this.goods);
        resolve();
      })
    })
  }

  async waitForPreviousDataLoading(): Promise<void> {
    let resolveDataLoading = () => {};
    const dataLoadingCheck = new Promise<void>((resolve) => {
      resolveDataLoading = resolve;
    })

    if (!this.isDataLoadingNow) {
      resolveDataLoading();
    } 
    else {
      await dataLoadingCheck;
    }
    return dataLoadingCheck;
  }
}

function removeNullsFromArray<T>(array: Array<T | null>, amount: number = array.length): Array<T | null> {
  let count = 0;
  return array.filter((value: T | null) => {
    if (value === null) count++;
    return (value != null) || (count > amount);
  })
}

function getNullsFromArray<T>(array: Array<T | null>): Array<T | null> {
  return array.filter((value: T | null) => value === null);
}

function getArrayWithoutNulls<T>(array: Array<T | null>): Array<T | null> {
  return array.filter((value: T | null) => value !== null);
}