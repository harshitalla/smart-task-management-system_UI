// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Task, TaskService } from './task.service';
// import { AuthService } from './auth.service';

// @Component({
//   selector: 'app-task',
//   standalone: true,
//   imports: [CommonModule, FormsModule, ReactiveFormsModule],
//   templateUrl: './task.component.html',
//   styleUrl: './task.component.css'
// })
// export class TaskComponent implements OnInit {
//   tasks: Task[] = [];
//   search = '';
//   statusFilter = 'All';
//   editingId: number | null = null;

//   form = this.fb.group({
//     title: ['', Validators.required],
//     description: [''],
//     priority: ['Medium', Validators.required],
//     status: ['Pending', Validators.required],
//     deadline: ['']
//   });

//   constructor(
//     private fb: FormBuilder,
//     private taskService: TaskService,
//     public auth: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.loadTasks();
//   }

//   loadTasks(): void {
//     this.taskService.getTasks().subscribe({
//       next: data => this.tasks = data,
//       error: error => console.error(error)
//     });
//   }

//   saveTask(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     const task = this.form.getRawValue() as Task;

//     if (this.editingId) {
//       task.id = this.editingId;
//       this.taskService.updateTask(task).subscribe(() => {
//         this.resetForm();
//         this.loadTasks();
//       });
//     } else {
//       this.taskService.createTask(task).subscribe(() => {
//         this.resetForm();
//         this.loadTasks();
//       });
//     }
//   }

//   editTask(task: Task): void {
//     this.editingId = task.id || null;
//     this.form.patchValue({
//       title: task.title,
//       description: task.description,
//       priority: task.priority,
//       status: task.status,
//       deadline: task.deadline ? task.deadline.substring(0, 10) : ''
//     });
//   }

//   deleteTask(id: number): void {
//     if (!confirm('Delete this task?')) return;

//     this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
//   }

//   resetForm(): void {
//     this.editingId = null;
//     this.form.reset({
//       title: '',
//       description: '',
//       priority: 'Medium',
//       status: 'Pending',
//       deadline: ''
//     });
//   }

//   get filteredTasks(): Task[] {
//     const searchText = this.search.toLowerCase();

//     return this.tasks.filter(task => {
//       const matchesSearch =
//         task.title.toLowerCase().includes(searchText) ||
//         task.description.toLowerCase().includes(searchText);

//       const matchesStatus =
//         this.statusFilter === 'All' ||
//         task.status === this.statusFilter;

//       return matchesSearch && matchesStatus;
//     });
//   }

//   logout(): void {
//     this.auth.logout();
//     window.location.reload();
//   }
// }

import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Task } from "./taks.model";
import { TaskService } from "./task.service";
import { AuthService } from "./auth.service";
@Component({
  selector: "app-task",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: "./task.component.html",
  styleUrl: "./task.component.css",
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  search = "";
  statusFilter = "All";
  editingId: number | null = null;
  form = this.fb.group({
    title: ["", Validators.required],
    description: [""],
    priority: ["Medium", Validators.required],
    status: ["Pending", Validators.required],
    deadline: [""],
  });
  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    public auth: AuthService,
  ) {}
  ngOnInit(): void {
    this.loadTasks();
  }
  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  saveTask(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const task = this.form.getRawValue() as Task;
    if (this.editingId !== null) {
      task.id = this.editingId;
      this.taskService.updateTask(task).subscribe(() => {
        this.resetForm();
        this.loadTasks();
      });
    } else {
      this.taskService.createTask(task).subscribe(() => {
        this.resetForm();
        this.loadTasks();
      });
    }
  }
  editTask(task: Task): void {
    this.editingId = task.id || null;
    this.form.patchValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      deadline: task.deadline ? task.deadline.substring(0, 10) : "",
    });
  }
  deleteTask(id: number): void {
    if (!confirm("Delete this task?")) {
      return;
    }
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }
  resetForm(): void {
    this.editingId = null;
    this.form.reset({
      title: "",
      description: "",
      priority: "Medium",
      status: "Pending",
      deadline: "",
    });
  }
  get filteredTasks(): Task[] {
    const searchText = this.search.toLowerCase();
    return this.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        task.description.toLowerCase().includes(searchText);
      const matchesStatus =
        this.statusFilter === "All" || task.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }
  logout(): void {
    this.auth.logout();
    window.location.reload();
  }
}
