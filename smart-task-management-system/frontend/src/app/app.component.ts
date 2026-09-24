// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { LoginComponent } from './login.component';
// import { TaskComponent } from './task.component';
// import { AuthService } from './auth.service';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule, LoginComponent, TaskComponent],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.css'
// })
// export class AppComponent {
//   constructor(public auth: AuthService) {}
// }

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { TaskComponent } from "./task.component";
import { AuthService } from "./auth.service";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule, LoginComponent, TaskComponent],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
