import { AbstractControl } from '@angular/forms';

export class EmailValidator {

  static validate(c: AbstractControl) {
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    return EMAIL_REGEXP.test(c.value) ? null : {
      validateEmail: {
        valid: false
      }
    };
  }
}
