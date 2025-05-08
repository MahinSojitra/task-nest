import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from 'src/app/models/login.model';
import { RegisterRequest, RegisterResponse } from 'src/app/models/register.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  // Handle login and store access and refresh tokens
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/signin`, credentials);
  }

  // Handle registration and store response message
  register(userData: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.apiUrl}/users/signup`, userData);
  }

  // Store both tokens in sessionStorage
  storeTokens(tokens: { accessToken: string; refreshToken: string }): void {
    sessionStorage.setItem('access_token', tokens.accessToken);
    sessionStorage.setItem('refresh_token', tokens.refreshToken);
  }

  // Get access token from sessionStorage
  getAccessToken(): string | null {
    return sessionStorage.getItem('access_token');
  }

  // Get refresh token from sessionStorage
  getRefreshToken(): string | null {
    return sessionStorage.getItem('refresh_token');
  }

  // Logout by removing tokens from sessionStorage
  logout(): void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
