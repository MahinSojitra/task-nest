import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { RefreshResponse } from '../models/token-response.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly STORAGE_KEY = 'access_encrypted';
  private readonly SECRET = process.env.STORAGE_ENCRYPTION_SECRET;
  private readonly REFRESH_URL = process.env.API_BASE_URL + '/users/refresh';

  constructor(private http: HttpClient) {}

  setSession(
    tokens: { accessToken: string; refreshToken: string },
    name: string,
    email: string
  ): void {
    const payload = JSON.stringify({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      userName: name,
      userEmail: email,
    });

    const encrypted = CryptoJS.AES.encrypt(payload, this.SECRET).toString();
    localStorage.setItem(this.STORAGE_KEY, encrypted);
  }

  clearSession(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private getDecryptedPayload(): any {
    const encrypted = localStorage.getItem(this.STORAGE_KEY);
    if (!encrypted) return null;

    try {
      const bytes = CryptoJS.AES.decrypt(encrypted, this.SECRET);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (e) {
      console.error('Token decryption failed:', e);
      this.clearSession();
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getAccessToken();
  }

  getUserName(): string {
    return this.getDecryptedPayload()?.userName || '';
  }

  getUserEmail(): string {
    return this.getDecryptedPayload()?.userEmail || '';
  }

  getAccessToken(): string | null {
    return this.getDecryptedPayload()?.accessToken || null;
  }

  getRefreshToken(): string | null {
    return this.getDecryptedPayload()?.refreshToken || null;
  }

  refreshAccessToken(): Observable<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.http
      .post<RefreshResponse>(this.REFRESH_URL, null, {
        headers: {
          'x-refresh-token': refreshToken,
        },
      })
      .pipe(
        map((response: RefreshResponse) => {
          if (response.success && response.data?.tokens) {
            return response.data.tokens;
          }
          throw new Error('Invalid token response format');
        }),
        catchError((error) => {
          console.error('Refresh token failed:', error);
          this.clearSession();
          throw error;
        })
      );
  }

  checkAndRefreshToken(): Observable<any> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      throw new Error('No access token available');
    }

    const decoded = this.decodeToken(accessToken);
    const expirationTime = decoded.exp * 1000;
    const currentTime = Date.now();

    if (currentTime >= expirationTime) {
      return this.refreshAccessToken().pipe(
        catchError((error) => {
          console.error('Error refreshing token:', error);
          throw error;
        })
      );
    }

    return new Observable();
  }

  private decodeToken(token: string): any {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
  }
}
