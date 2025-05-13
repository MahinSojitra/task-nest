import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly STORAGE_KEY = 'access_encrypted';
  private readonly SECRET = environment.encryptionSecret;

  setSession(tokens: { accessToken: string; refreshToken: string }, name: string, email: string): void {
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
}
