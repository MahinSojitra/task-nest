import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/core/models/task.model';
import { TaskResponse } from 'src/app/core/models/task-response.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalTasks: number = 0;
  tasks: Task[] = [];
  isLoading = true;
  skeletonArray = Array(6);

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasksForUser().subscribe({
      next: (response: TaskResponse) => {
        this.tasks = response.data.tasks;
        this.totalTasks = response.data.total;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
