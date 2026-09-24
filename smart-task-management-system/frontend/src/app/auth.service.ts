// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';

// interface LoginResponse {
//   token: string;
//   user: {
//     id: number;
//     name: string;
//     email: string;
//     role: string;
//   };
// }

// @Injectable({ providedIn: 'root' })
// export class AuthService {
//   private api = 'http://localhost:3000/api/auth';

//   constructor(private http: HttpClient) {}

//   login(email: string, password: string): Observable<LoginResponse> {
//     return this.http.post<LoginResponse>(`${this.api}/login`, { email, password }).pipe(
//       tap(response => {
//         localStorage.setItem('token', response.token);
//         localStorage.setItem('user', JSON.stringify(response.user));
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   getUser(): any {
//     const user = localStorage.getItem('user');
//     return user ? JSON.parse(user) : null;
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }
// }

import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
@Injectable({ providedIn: "root" })
export class AuthService {
  private loggedIn = !!localStorage.getItem("dummy_token");
  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  login(email: string, password: string): Observable<any> {
    if (email === "admin@example.com" && password === "admin123") {
      localStorage.setItem("dummy_token", "dummy-token");
      localStorage.setItem(
        "user",
        JSON.stringify({ id: 1, name: "Sai Teja", email: email }),
      );
      this.loggedIn = true;
      return of({ message: "Login successful", token: "dummy-token" });
    }
    return throwError(() => ({
      error: { message: "Invalid email or password" },
    }));
  }
  logout(): void {
    localStorage.removeItem("dummy_token");
    localStorage.removeItem("user");
    this.loggedIn = false;
  }
  getUser(): any {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  }
}
