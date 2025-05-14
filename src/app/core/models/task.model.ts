import { TaskStatus } from "../enums/task-status.enum";

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: Date;
  status: TaskStatus;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}
