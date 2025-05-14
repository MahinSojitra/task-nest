import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    window.addEventListener('storage', (event) => {
      if (event.key === 'access_encrypted' && event.newValue === null) {
        this.authService.logout(false);
        this.router.navigate(['/auth/login'], {
          queryParams: { sessionExpired: true }
        });
      }
    });
  }

}
