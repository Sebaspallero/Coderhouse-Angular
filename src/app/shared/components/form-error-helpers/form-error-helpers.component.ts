import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-form-error-helpers',
  templateUrl: './form-error-helpers.component.html',
  styleUrls: ['./form-error-helpers.component.css']
})
export class FormErrorHelpersComponent {

  @Input()
    formErrors: ValidationErrors | null = null;
  
}
