import { Attribute, Directive, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appValidateEqual][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualDirective), multi: true }],
})
export class EqualDirective implements Validator {
  constructor(@Attribute('appValidateEqual') private validateEqual: string) {}

  validate(control: AbstractControl): ValidationErrors {
    const self = control?.value;
    const anotherVal = control?.root?.get?.(this.validateEqual)?.value;

    if (self && anotherVal && self !== anotherVal) {
      return {
        validateEqual: true,
      };
    } else {
      return {};
    }
  }

  registerOnValidatorChange?(fn: () => void): void {}
}
