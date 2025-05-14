import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoginQueryParams } from 'src/app/core/models/query-params.model';
import { emailAvailabilityValidator } from 'src/app/core/validators/email-availability.validator';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss']
})
export class AuthFormComponent implements OnChanges, OnInit {

  @Output() submitForm = new EventEmitter<any>();
  @Input() mode: 'login' | 'register' = 'login';
  @Input() loading: boolean = false;
  @Input() formErrors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  } = {};

  form: FormGroup;
  queryParams!: LoginQueryParams;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute) {
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: LoginQueryParams) => {
      this.queryParams = params;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mode']) {
      this.form = this.buildForm();
    }
  }

  buildForm(): FormGroup {
    const passwordValidators = [Validators.required, Validators.minLength(6)];

    if (this.mode === 'register') {
      passwordValidators.push(
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/)
      );
    }

    const group: any = {
      password: ['', passwordValidators],
    };

    if (this.mode === 'register') {
      group['email'] = [
        '',
        [Validators.required, Validators.email],
        [emailAvailabilityValidator(this.http)]
      ];
    } else {
      group['email'] = ['', [Validators.required, Validators.email]];
    }

    if (this.mode === 'register') {
      group['name'] = ['', [Validators.required, Validators.minLength(3)]];
      group['confirmPassword'] = ['', Validators.required];
    }

    const formGroup = this.fb.group(group);

    if (this.mode === 'register') {
      formGroup.setValidators(this.passwordMatchValidator());
    }

    return formGroup;
  }

  passwordMatchValidator(): ValidatorFn {
    return (group: AbstractControl): { [key: string]: any } | null => {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { passwordMismatch: true };
    };
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    } else {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
    }
  }

  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }

  get password() {
    return this.form.get('password');
  }

  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  toggleMode(): void {
    this.mode = this.mode === 'login' ? 'register' : 'login';
    this.form = this.buildForm();
  }
}
