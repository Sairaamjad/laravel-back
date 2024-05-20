import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from './user.model';

const API_URL = environment.apiUser;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  authToken!: string;
  userId: number | undefined; 

  constructor(private http: HttpClient) {}

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
          
          console.log(response.token,"token local auth")
          localStorage.setItem('access_token', response.token);
        }
      }),
      catchError(error => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }
}
