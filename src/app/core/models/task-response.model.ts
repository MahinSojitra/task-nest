import { Task } from './task.model';

export interface TaskResponse {
  success: boolean;
  data: {
    tasks: Task[];
    total: number;
  };
}
