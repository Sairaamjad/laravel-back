// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }
  
  onSubmit(): void {
    this.userService.login(this.email, this.password).subscribe(
      (response) => {
        const token = response.token;
         
        // localStorage.setItem('token', token);
         console.log(token,"token")
        // Redirect to todos page
        this.router.navigate(['/todos']);
      },
      (error) => {
        console.error("Login failed:", error);
      }
    );
  }
}
