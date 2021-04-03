import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[validateEqual][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualDirective), multi: true }]
})
export class EqualDirective implements Validator {
  constructor(@Attribute('validateEqual') private validateEqual: string) {}

  validate(control: AbstractControl): ValidationErrors {
    const self = control.value;
    const anothenVal = control.root.get(this.validateEqual).value;

    if (self && anothenVal && self !== anothenVal) {
      return {
        validateEqual: true
      };
    }
  }

  registerOnValidatorChange?(fn: () => void): void {}
}
