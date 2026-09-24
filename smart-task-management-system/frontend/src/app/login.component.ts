// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { AuthService } from './auth.service';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent {
//   error = '';

//   form = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService
//   ) {}

//   login(): void {
//     if (this.form.invalid) {
//       this.form.markAllAsTouched();
//       return;
//     }

//     const { email, password } = this.form.getRawValue();

//     this.auth.login(email!, password!).subscribe({
//       next: () => window.location.reload(),
//       error: error => {
//         this.error = error.error?.message || 'Login failed';
//       }
//     });
//   }
// }

import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "./auth.service";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent {
  error = "";
  form = this.fb.group({
    email: ["", [Validators.required, Validators.email]],
    password: ["", Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
  ) {}
  login(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { email, password } = this.form.getRawValue();
    this.auth.login(email!, password!).subscribe({
      next: () => window.location.reload(),
      error: (error) => {
        this.error = error.error?.message || "Login failed";
      },
    });
  }
}
