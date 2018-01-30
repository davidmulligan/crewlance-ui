import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => ValidateEqualDirective), multi: true }
  ]
})
export class ValidateEqualDirective {

  constructor(@Attribute('validateEqual') public validateEqual: string) { }

  validate(control: AbstractControl): { [key: string]: any } {
    if (control.root.get(this.validateEqual) && control.value !== control.root.get(this.validateEqual).value) {
      return {
        validateEqual: false
      };
    }
    return null;
  }
}
