import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { firstValueFrom } from 'rxjs';
import { DEFAULT_GOODS_PLACEHOLDER, GoodsInfo, StreetAddress } from 'src/app/domain';
import { API_SERVER_PATH } from 'src/app/domain/tokens';
import { isFulfilled, isRejected } from 'src/app/lib';

@Injectable({
  providedIn: 'root'
})
export class GoodsInfoLoaderService {
  private DEFAULT_GOODS_INFO_LOADINGS: number = 10;
  private alreadyLoaded: number = 0;

  constructor(private httpClient: HttpClient,
              @Inject(API_SERVER_PATH) private apiServerPath: string) {
  }

  public async getGoodsInfos(amount: number = this.DEFAULT_GOODS_INFO_LOADINGS): Promise<(GoodsInfo)[]> {    
    const loadings = new Array<Promise<GoodsInfo>>(amount);

    for (let i = 0; i < amount; i++) {
      loadings[i] = this.read(i + this.alreadyLoaded);
    }

    const results: PromiseSettledResult<any>[] = await Promise.allSettled(loadings);
    const goodsInfosLoaded = results.filter(isFulfilled).map(element => element.value);
    this.alreadyLoaded += goodsInfosLoaded.length;

    return new Promise<GoodsInfo[]>((resolve, reject) => {
      if (goodsInfosLoaded.length === 0) {
        reject("no more goods in storage");
      } else {
        resolve(goodsInfosLoaded); 
      }
    })
  }

  public create(goodsInfo: GoodsInfo): Promise<GoodsInfo> {
    return firstValueFrom(this.httpClient.post<GoodsInfo>(`${ this.apiServerPath }/goodsInfos`, goodsInfo))
  }

  public update(id: number, goodsInfo: GoodsInfo): Promise<GoodsInfo> {
    return firstValueFrom(this.httpClient.put<GoodsInfo>(`${ this.apiServerPath }/goodsInfos/${ id }`, goodsInfo))
  }

  public read(id: number): Promise<GoodsInfo> {
    return firstValueFrom(this.httpClient.get<{goodsInfo: GoodsInfo, id: number}>(`${ this.apiServerPath }/goodsInfos/${ id }`)).then((value: {goodsInfo: GoodsInfo, id: number}) => {
      return value.goodsInfo;
    })
  }

  public readAll(): Promise<readonly GoodsInfo[]> {
    return firstValueFrom(this.httpClient.get<readonly ({goodsInfo: GoodsInfo, id: number})[]>(`${ this.apiServerPath }/goodsInfos`)).then((value: readonly ({goodsInfo: GoodsInfo, id: number})[]) => {
      return value.map(value => value.goodsInfo);
    })
  }

  public delete(id: number): Promise<unknown> {
    return firstValueFrom(this.httpClient.delete<GoodsInfo>(`${ this.apiServerPath }/goodsInfos/${ id }`))
  }









  private async test() {
    


    const data = new Array(16);
    for (let i = 0; i < data.length; i++) {
      data[i] = this.read(i);
    }

    Promise.allSettled(data).then((result: PromiseSettledResult<any>[]) => {
      
      for (let item of result) {
        if (isFulfilled(item)) {
          console.log(item.value);
        }
      }

      for (let item of result) {
        console.log(item.status)
      }
    })
  }
}


