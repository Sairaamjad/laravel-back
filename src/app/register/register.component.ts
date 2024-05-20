// src/app/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const user: User = {
      email: this.email,
      name: this.username,
      password: this.password
    };

    this.userService.register(user).subscribe(
      (response) => {
        console.log('Registration successful:', response);

        // Clear form fields
        this.email = '';
        this.username = '';
        this.password = '';

        // Navigate to login page
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
