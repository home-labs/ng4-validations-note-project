import {
    Component,
    OnInit,
    Output
} from '@angular/core';
import {
    FormGroup,
    FormBuilder,
    Validators
} from '@angular/forms';

// import * as NgFormValidationsNotifier from 'ng-form-validations-notifier/services';
import * as NgFormValidationsNotifier from 'dist/ng-form-validations-notifier';


@Component({
    selector: 'app-reactive-form-form',
    templateUrl: '../form.html',
    styleUrls: ['../form.sass']
})
export class NewComponent implements  OnInit {

    form: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private validator: NgFormValidationsNotifier.Services.Notifier
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: [null, [Validators.required, Validators.minLength(4)]],
            name2: [null, [Validators.required]]
        });
    }

    onSubmit() {
        // this.validator.notify();
        // report form to make uniq component has effect
        this.validator.notify(this.form);
    }

}
