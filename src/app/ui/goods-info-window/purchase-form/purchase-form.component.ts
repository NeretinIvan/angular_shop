import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoodsInfo } from 'src/app/domain';


@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent {
  @Input()
  public goodsSelected: GoodsInfo | null = null;
  
  public purchaseForm = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    patronymic: new FormControl(""),
    phoneNumber: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    goods: new FormControl(null, Validators.required)
  })

  public onFormSubmit(): void {
    this.purchaseForm.controls["goods"].setValue(this.goodsSelected);
    console.log(this.purchaseForm.value)
  }
}
