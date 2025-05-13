import { Component, OnInit } from '@angular/core';
import { AuthService } from './features/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'task-nest';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.checkLoginStatus();
  }
}
