import { Directive, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Directive({
  selector: '[appIfFieldInvalid]'
})
export class IfFieldInvalidDirective implements OnInit {
  @Input("appIfFieldInvalid")
  public formControl: AbstractControl | null = null;
  
  constructor(private templateRef: TemplateRef<any>,
              private viewContainer: ViewContainerRef) { 
  }
  
  ngOnInit(): void {
    this.formControl?.valueChanges.subscribe((value) => {
      if (!this.formControl) return;
      if (this.formControl.touched && this.formControl.invalid) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        this.viewContainer.clear();
      }
    })
  }
}
