import { Injectable } from '@angular/core';
import {
  NgForm,
  FormControl,
  FormGroup
} from '@angular/forms';


@Injectable()
export class TemplateDrivenService {

  private validationSubscription: Promise<Object>;
  private _emitValidity: Function;

  // constructor(control: FormControl, validationTypes: Array<string>) {
  constructor() {
    this.validationSubscription = new Promise(accomplish => {
      this._emitValidity = accomplish;
    });
  }

  private copyValues(ngForm: NgForm): Object {
    const
      valuesMap: Object = {};

    Object.keys(ngForm.controls).forEach(control => {
      valuesMap[control] = ngForm.controls[control].value;
    });

    return valuesMap;
  }

  resetForm(ngForm: NgForm) {
    const
      valuesCopy: Object = this.copyValues(ngForm);

    ngForm.resetForm(valuesCopy);
  }

  getValidationErrorFor(
    control: FormControl,
    validationTypes: Array<string>
  ): string {
    if (control.invalid) {
      for (const error of Object.keys(control.errors)) {
        if (validationTypes.indexOf(error) !== -1) {
          return error;
        }
      }
    }

    return '';
  }

  // the control would can be passed by here, but for some reason the control still doesn’t exist in any default initialization event
  getValidationSubscription(): Promise<Object> {
    return this.validationSubscription;
  }

  emitValidity(form: NgForm | FormGroup = null) {
    this._emitValidity({ form: form });
  }

}
