import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer, of, Subscription } from 'rxjs';
import { tap, switchMap, catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SessionResponse, Session } from '../models/session.model';

@Injectable({
  providedIn: 'root',
})
export class SessionService implements OnDestroy {
  private apiUrl = environment.apiUrl + '/auth/sessions';

  private sessionsSubject = new BehaviorSubject<Session[] | null>(null);
  private refreshSubscription?: Subscription;

  constructor(private http: HttpClient) {
    this.initAutoRefresh();
  }

  getActiveSessions(): Observable<Session[] | null> {
    return this.sessionsSubject.asObservable().pipe(shareReplay(1));
  }

  private fetchSessions(): Observable<Session[]> {
    return this.http.get<SessionResponse>(this.apiUrl).pipe(
      tap((res) => this.sessionsSubject.next(res.data.sessions)),
      switchMap((res) => of(res.data.sessions)),
      catchError((error) => {
        console.error('Error fetching sessions', error);
        this.sessionsSubject.next([]);
        return of([]);
      })
    );
  }

  private initAutoRefresh(): void {
    this.refreshSubscription = timer(0, 60000)
      .pipe(switchMap(() => this.fetchSessions()))
      .subscribe();
  }

  ngOnDestroy() {
    this.refreshSubscription?.unsubscribe();
  }
}
