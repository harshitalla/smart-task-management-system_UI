// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Task {
//   id?: number;
//   title: string;
//   description: string;
//   priority: string;
//   status: string;
//   deadline: string;
//   assigned_to?: number;
//   assigned_user?: string;
// }

// @Injectable({ providedIn: 'root' })
// export class TaskService {
//   private api = 'http://localhost:3000/api/tasks';

//   constructor(private http: HttpClient) {}

//   private headers(): HttpHeaders {
//     return new HttpHeaders({
//       Authorization: `Bearer ${localStorage.getItem('token')}`
//     });
//   }

//   getTasks(): Observable<Task[]> {
//     return this.http.get<Task[]>(this.api, { headers: this.headers() });
//   }

//   createTask(task: Task): Observable<any> {
//     return this.http.post(this.api, task, { headers: this.headers() });
//   }

//   updateTask(task: Task): Observable<any> {
//     return this.http.put(`${this.api}/${task.id}`, task, { headers: this.headers() });
//   }

//   deleteTask(id: number): Observable<any> {
//     return this.http.delete(`${this.api}/${id}`, { headers: this.headers() });
//   }
// }

import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Task } from "./taks.model"; 
@Injectable({ providedIn: "root" })
export class TaskService {
  private tasks: Task[] = [
    {
      id: 1,
      title: "Design Login Page",
      description: "Create responsive login page UI",
      priority: "High",
      status: "Pending",
      deadline: "2026-09-28",
      assigned_to: 1,
      assigned_user: "Sai Teja",
    },
    {
      id: 2,
      title: "Implement Dashboard",
      description: "Develop task management dashboard",
      priority: "High",
      status: "In Progress",
      deadline: "2026-09-30",
      assigned_to: 2,
      assigned_user: "Rahul",
    },
    {
      id: 3,
      title: "API Integration",
      description: "Integrate backend APIs with frontend",
      priority: "Medium",
      status: "Pending",
      deadline: "2026-10-02",
      assigned_to: 3,
      assigned_user: "Priya",
    },
    {
      id: 4,
      title: "Testing",
      description: "Perform functional and UI testing",
      priority: "Low",
      status: "Completed",
      deadline: "2026-09-25",
      assigned_to: 4,
      assigned_user: "Arun",
    },
    {
      id: 5,
      title: "Fix UI Bugs",
      description: "Resolve reported UI issues",
      priority: "Medium",
      status: "In Progress",
      deadline: "2026-09-27",
      assigned_to: 1,
      assigned_user: "Sai Teja",
    },
  ];
  getTasks(): Observable<Task[]> {
    return of([...this.tasks]);
  }
  createTask(task: Task): Observable<Task> {
    const newTask: Task = { ...task, id: this.getNextId() };
    this.tasks.push(newTask);
    return of(newTask);
  }
  updateTask(task: Task): Observable<Task> {
    const index = this.tasks.findIndex((item) => item.id === task.id);
    if (index !== -1) {
      this.tasks[index] = { ...task };
    }
    return of(task);
  }
  deleteTask(id: number): Observable<boolean> {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return of(true);
  }
  private getNextId(): number {
    return this.tasks.length > 0
      ? Math.max(...this.tasks.map((task) => task.id || 0)) + 1
      : 1;
  }
}
