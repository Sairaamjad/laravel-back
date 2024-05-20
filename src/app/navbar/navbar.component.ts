import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.updateLoginStatus();
  }

  updateLoginStatus(): void {
    this.isLoggedIn = !!localStorage.getItem('access_token');
    this.cdr.detectChanges();
  }

  logout(): void {
    localStorage.removeItem('access_token'); // Remove access token from local storage
    localStorage.removeItem('user_id'); // Remove user id from local storage if necessary
    this.isLoggedIn = false; // Update isLoggedIn status
    this.cdr.detectChanges(); // Trigger change detection
    this.router.navigate(['/login']); // Navigate to login page
  }
}
