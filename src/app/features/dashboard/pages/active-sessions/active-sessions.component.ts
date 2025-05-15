import { Component, OnInit } from '@angular/core';
import { Session } from 'src/app/core/models/session.model';
import { SessionService } from 'src/app/core/services/session.service';

@Component({
  selector: 'app-active-sessions',
  templateUrl: './active-sessions.component.html',
  styleUrls: ['./active-sessions.component.scss']
})
export class ActiveSessionsComponent implements OnInit {
  sessions: Session[] = [];
  isLoading = true;
  hasFetchedOnce = false;

  constructor(private sessionService: SessionService) {}

  ngOnInit(): void {
    this.sessionService.getActiveSessions().subscribe({
      next: (sessions) => {
        if (sessions !== null) {
          this.sessions = sessions;
          this.isLoading = false;
          this.hasFetchedOnce = true;
        } else {
          this.isLoading = true;
        }
      },
      error: () => {
        this.isLoading = false;
        this.hasFetchedOnce = true;
      }
    });
  }
}
