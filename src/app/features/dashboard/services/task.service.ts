import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TaskResponse } from 'src/app/core/models/task-response.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTasksForUser(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/tasks`);
  }
}
