import { Injectable, Inject } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { firstValueFrom } from 'rxjs';
import { DEFAULT_GOODS_PLACEHOLDER, GoodsInfo, StreetAddress } from 'src/app/domain';
import { API_SERVER_PATH } from 'src/app/domain/tokens';

@Injectable({
  providedIn: 'root'
})
export class GoodsInfoLoaderService {
  private DEFAULT_GOODS_INFO_LOADINGS: number = 10;

  constructor(private httpClient: HttpClient,
              @Inject(API_SERVER_PATH) private apiServerPath: string) {
  }

  public async getGoodsInfos(amount: number = this.DEFAULT_GOODS_INFO_LOADINGS): Promise<(GoodsInfo | null)[]> {
    let goodsInfosLoaded = new Array<GoodsInfo | null>(amount);
    const loadings = new Array<Promise<void>>(amount);

    for (let i = 0; i < amount; i++) {
      loadings[i] = this.read(i).then((value: GoodsInfo) => {
        goodsInfosLoaded[i] = value;
      }).catch((error: string) => {
        goodsInfosLoaded[i] = null;
      });
    }

    await Promise.allSettled(loadings);

    //lag imitation
    return new Promise<(GoodsInfo | null)[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(goodsInfosLoaded);
      }, 1000)
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
}
