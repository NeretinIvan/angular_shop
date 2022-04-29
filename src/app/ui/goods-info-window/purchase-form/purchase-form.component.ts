import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_GOODS_PLACEHOLDER, GoodsInfo, StreetAddress } from 'src/app/domain';
import { PurchaseRequestSenderService } from './purchase-request-sender.service';

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
      console.log(this.purchaseForm.value);
      this.requestSender.create(this.purchaseForm.value).then(() => {
        alert("Заказ выполнен успешно!")
      }).catch((reason: any) => {
        console.log(reason);
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
}
