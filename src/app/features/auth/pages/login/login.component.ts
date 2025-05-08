import { Component } from '@angular/core';
import { LoginRequest, LoginResponse } from 'src/app/models/login.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loading: boolean = false;
  formErrors: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  } = {};

  constructor(private authService: AuthService, private router: Router) {}

  login(formData: LoginRequest) {
    this.loading = true;
    this.formErrors = {};

    this.authService.login(formData).subscribe({
      next: (response: LoginResponse) => {
        if (response.success) {
          this.authService.storeTokens(response.data.tokens);
          this.router.navigate(['/']);
        } else {
          this.formErrors.general = response.message || 'Login failed.';
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
            if (lowerErr.includes('email')) {
              this.formErrors.email = err;
            } else if (lowerErr.includes('password')) {
              this.formErrors.password = err;
            } else {
              this.formErrors.general = err;
            }
          });

          if (errorList.length === 0) {
            if (
              message.includes('verify your credentials')
            ) {
              this.formErrors.password = 'Password is incorrect.';
            } else {
              this.formErrors.general = rawMessage;
            }
          }
        } else if (error.status === 429) {
          this.formErrors.general = 'Too many login attempts. Please wait and try again.';
        } else {
          this.formErrors.general = 'Something went wrong. Please try again later.';
        }

      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
