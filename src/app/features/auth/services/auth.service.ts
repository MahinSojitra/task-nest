import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TokenService } from 'src/app/core/services/token.service';
import { LoginRequest, LoginResponse } from 'src/app/core/models/login.model';
import { RegisterRequest, RegisterResponse } from 'src/app/core/models/register.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.tokenService.isLoggedIn());
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/signin`, credentials).pipe(
      tap((response: LoginResponse) => {
        const { accessToken, refreshToken } = response.data.tokens;
        const { name, email } = response.data.user;
        this.tokenService.setSession({ accessToken, refreshToken }, name, email);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/users/signup`, userData);
  }

  checkLoginStatus(): void {
    const loggedIn = this.tokenService.isLoggedIn();
    this.isLoggedInSubject.next(loggedIn);
    if (!loggedIn) {
      this.logout(false);
    }
  }

  logout(navigate = true): void {
    this.tokenService.clearSession();
    this.isLoggedInSubject.next(false);
    if (navigate) {
      this.router.navigate(['/auth/login'], {
        queryParams: { signedOut: true }
      });
    }
  }

  getUserName(): string {
    return this.tokenService.getUserName();
  }

  getUserEmail(): string {
    return this.tokenService.getUserEmail();
  }

  isLoggedIn(): boolean {
    return this.tokenService.isLoggedIn();
  }
}
