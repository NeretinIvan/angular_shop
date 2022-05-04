import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_GOODS_PLACEHOLDER, GoodsInfo, StreetAddress } from 'src/app/domain';
import { PurchaseRequestSenderService } from './purchase-request-sender.service';

type PurchaseResult = {
  goods: GoodsInfo,
  id: number
}

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements AfterContentInit {
  @Input()
  public goodsSelected: GoodsInfo | null = null;

  @Input()
  public addressSelected: StreetAddress | null = null;
  
  @Output()
  public formCancelled = new EventEmitter<void>();

  @Output()
  public formClosed = new EventEmitter<void>();

  public purchaseResult: PurchaseResult = { goods: DEFAULT_GOODS_PLACEHOLDER, id: -1 };
  public isPurchaseComlete: boolean = false;
  public isRequestLoading: boolean = false;

  public purchaseForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    patronymic: new FormControl(""),
    phoneNumber: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    goods: new FormControl(null, Validators.required),
    addressSelected: new FormControl(null, Validators.required)
  })

  constructor(private requestSender: PurchaseRequestSenderService) {
  }

  public onFormSubmit(): void {
    if (this.purchaseForm.valid) {
      this.isRequestLoading = true;
      this.requestSender.create(this.purchaseForm.value).then((value: PurchaseResult) => {
        this.purchaseResult = value;
        this.isPurchaseComlete = true;
        this.isRequestLoading = false;
      }).catch((reason: any) => {
        console.log(reason);
        this.isRequestLoading = false;
        alert("Не удалось выполнить заказ :(");
      });
    }
    else {
      alert("Форма не валидна");
    }
  }

  public ngAfterContentInit(): void {
    this.purchaseForm.controls["goods"].setValue(this.goodsSelected);
    this.purchaseForm.controls["addressSelected"].setValue(this.addressSelected);
  }

  public getSelectedAddress(): StreetAddress {
    if (this.addressSelected) return this.addressSelected;
    return {
      address: "Не указан",
      coordinates: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  public getSelectedGoods(): GoodsInfo {
    if (this.goodsSelected) return this.goodsSelected;
    return DEFAULT_GOODS_PLACEHOLDER;
  }

  public onBackButton(): void {
    this.formCancelled.emit();
  }

  public onCloseButton(): void {
    this.formClosed.emit();
  }

  public isFieldInvalidAndTouched(fieldName: string): boolean {
    return this.purchaseForm.controls[fieldName].invalid && this.purchaseForm.controls[fieldName].touched;
  }
}
