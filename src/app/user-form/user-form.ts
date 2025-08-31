import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css'
})
export class UserForm {
  userForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, this.customNameValidator]],
      email: ['', Validators.required]
    });
  }

  customNameValidator(control: any) {
    const value = control.value;
    if (value && value.length < 3) {
      return { minLength: true };
    }
    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.formSubmitted.emit(this.userForm.value);
      console.log('Form submitted:', this.userForm.value);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.userForm.get(controlName);
    return !!(control && control.touched && control.hasError(errorName));
  }
}
