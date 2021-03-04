import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import {
    FormControl,
    FormGroup,
    NgForm
} from '@angular/forms';

import { Notifier } from '../../services/notifier';


@Component({
    selector: 'lib-form-validation-list',
    templateUrl: './template.html',
    styleUrls: ['./style.styl']
})
export class ListComponent implements OnInit {

    @Input()
    messages!: object;

    @Input()
    nameTranslations!: object;

    displayed: boolean;

    errorMessages: Array<string> = [];

    constructor(
        private notifier: Notifier
    ) {
        this.displayed = false;
    }

    ngOnInit() {

    }

    validate(form: NgForm | FormGroup) {

        let mappedErrorKey!: string;

        let controls: object;

        let control: FormControl;

        if (form) {
            controls = form.controls;
            this.errorMessages = [];
            for (const fieldName of Object.keys(form.controls)) {
                control = (controls as any)[fieldName];
                mappedErrorKey = this.notifier.getNextError4(
                    control,
                    Notifier.getTypeKeysFrom(this.messages)
                );

                if ((this.nameTranslations as any)[fieldName] && mappedErrorKey) {
                    this.errorMessages.push(`\n${(this.nameTranslations as any)[fieldName]} ${(this.messages as any)[mappedErrorKey]}`);
                }
            }

            if (mappedErrorKey) {
                this.displayed = true;
            }
        }
    }

}