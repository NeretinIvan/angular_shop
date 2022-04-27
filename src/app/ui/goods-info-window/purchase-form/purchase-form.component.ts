import { AfterContentInit, Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoodsInfo } from 'src/app/domain';


@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.scss']
})
export class PurchaseFormComponent implements AfterContentInit {
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
    console.log(this.purchaseForm.value)
  }

  public ngAfterContentInit(): void {
    this.purchaseForm.controls["goods"].setValue(this.goodsSelected);
  }
}
