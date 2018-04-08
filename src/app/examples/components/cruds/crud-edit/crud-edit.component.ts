import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { CrudService } from './../../../services/crud/crud.service';
import { ExampleModel } from '../../../services/crud/example-model';
import { IFormCanDeactivate } from '../../../../guards/form-deactivate/i-form-can-deactivate';
import { IFormValidation } from '../../../../services/form-validation/i-form-validation';
import { FormValidationService } from '../../../../services/form-validation/form-validation.service';


@Component({
  selector: 'app-crud-form',
  templateUrl: './../crud-form.component.html',
  styleUrls: ['./crud-edit.component.sass'],
})
export class CrudEditComponent implements OnInit,
                                          OnDestroy,
                                          IFormCanDeactivate,
                                          IFormValidation {

  private modelReference: ExampleModel;
  private paramsSubscription: Subscription;
  private params: Object;
  private formChanged: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private crudService: CrudService,
    private validationService: FormValidationService
  ) {}

  onInput() {
    this.formChanged = true;
  }

  canDeactivate(): boolean {
    if (this.formChanged) {
      return confirm(`Os dados preenchidos serão perdidos. Deseja Continuar?`);
    }
    return true;
  }

  ngOnInit() {
    this.paramsSubscription = this.route.params.subscribe(
      (params: Object) => {
        this.params = params;
        this.modelReference = this.crudService.getExampleModel(+params[`id`]);

        if (this.modelReference === null) {
          // render model not found page instead
          this.modelReference = new ExampleModel();
        }
      }
    );
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  foundMessageKeysOf(element: HTMLElement): Array<string> {
    return this.validationService.foundMessageKeysOf(element);
  }

  valid(element: HTMLElement, validationType: Array<string>): Boolean {
    return this.validationService.valid(element, validationType);
  }

  onSubmit(form: NgForm) {
    this.validationService.buildValidationsMap(form);
    if (form.valid) {
      this.crudService.update(form.value);
    }
  }

}
