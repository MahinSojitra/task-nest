import { Component, Input } from '@angular/core';
import { Session } from 'src/app/core/models/session.model';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styleUrls: ['./session-card.component.scss']
})
export class SessionCardComponent {

  @Input() session!: Session;

  getDeviceIconClass(platform: string): string {
    const p = platform.toLowerCase();

    if (p.includes('desktop') || p.includes('mac') || p.includes('windows') || p.includes('linux')) {
      return 'bi-laptop';
    }

    if (p.includes('mobile') || p.includes('ios') || p.includes('android')) {
      return 'bi-phone';
    }

    if (p.includes('api') || p.includes('postman') || p.includes('curl')) {
      return 'bi-terminal';
    }

    return 'bi-pc-display';
  }

}
