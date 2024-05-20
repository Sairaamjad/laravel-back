import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { jwtDecode } from 'jwt-decode'; 

const API_URL = environment.apiUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken!: string;
  userId: number | undefined;

  constructor(private http: HttpClient) {
    // Load the user ID from localStorage when the service is instantiated
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      this.userId = parseInt(storedUserId, 10);
    }
  }

  // User registration
  register(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/create`, user);
  }

  // User login
  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<any>(`${API_URL}/login`, body, { headers }).pipe(
      tap(response => {
        console.log(response);
        if (response.token) {
          console.log(response.token, "token local auth");
          localStorage.setItem('access_token', response.token);
          const decodedToken: any = jwtDecode(response.token); 
          const userId = decodedToken.id;
          localStorage.setItem('user_id', userId);
          this.userId = userId; 
          console.log('User ID set:', this.userId); 
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  // Method to get the stored user ID
  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
}
