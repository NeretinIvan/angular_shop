import { Injectable, Inject } from '@angular/core';
import { API_SERVER_PATH } from 'src/app/domain/tokens';
import { HttpClient } from "@angular/common/http"
import { firstValueFrom } from 'rxjs';
import { GoodsInfo, StreetAddress } from 'src/app/domain';

@Injectable({
  providedIn: 'root'
})
export class PurchaseRequestSenderService {
  constructor(private httpClient: HttpClient,
    @Inject(API_SERVER_PATH) private apiServerPath: string) {
  }

  public create(request: object): Promise<any> {
    return firstValueFrom(this.httpClient.post<object>(`${ this.apiServerPath }/purchaseRequests`, request))
  }
}
