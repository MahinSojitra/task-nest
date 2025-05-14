import { Component } from '@angular/core';
import { RegisterRequest, RegisterResponse } from 'src/app/core/models/register.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  loading: boolean = false;
  formErrors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  } = {};

  constructor(private authService: AuthService, private route: Router) {}

  register(formData: RegisterRequest) {
    this.loading = true;
    this.authService.register(formData).subscribe({
      next: (response: RegisterResponse) => {
        this.loading = false;

        if (response.success) {
          this.route.navigate(['/auth/login'], {
            queryParams: { accountCreated: true }
          });
        }
      },
      error: (error) => {
        this.loading = false;

        if (error.status === 0) {
          this.formErrors.general = 'No internet connection.';
        } else if (error.status === 400 || error.status === 401) {
          const rawMessage = error.error?.message || '';
          const message = rawMessage.toLowerCase();

          const errorList: string[] = error.error?.errors || [];
          errorList.forEach((err) => {
            const lowerErr = err.toLowerCase();
            if (lowerErr.includes('name')) {
              this.formErrors.name = err;
            } else if (lowerErr.includes('email')) {
              this.formErrors.email = err;
            } else if (lowerErr.includes('password')) {
              this.formErrors.password = err;
            } else {
              this.formErrors.general = err;
            }
          });

          if (errorList.length === 0) {
            this.formErrors.general = rawMessage
          }
        } else if (error.status === 429) {
          this.formErrors.general = 'Too many login attempts. Please wait and try again.';
        } else {
          this.formErrors.general = 'Something went wrong in creating your account. Please try again later.';
        }
      },
      complete: () => {
        this.loading = false;
      }
  });
  }
}
