import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskResponse } from 'src/app/core/models/task-response.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = process.env.API_BASE_URL;

  constructor(private http: HttpClient) {}

  getTasksForUser(): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/tasks`);
  }
}
