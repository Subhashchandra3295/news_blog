import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../authentication/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  showRegistrationMenu: boolean = false;
  token: any;
  userName: string = '';
  userRole: string = '';

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  // ngOnInit(): void {
  //   if (this.token != "" && this.authService.isLoggedIn()) {
  //     this.showRegistrationMenu = true;
  //   } else {
  //     this.showRegistrationMenu = false;
  //   }
  // }
  ngOnInit(): void {
    // Check if user is logged in
    this.showRegistrationMenu = this.authService.isLoggedIn();
    // Get user name if logged in
    if (this.showRegistrationMenu) {
     
      this.userName = localStorage.getItem('user_name') || '';
      this.userRole = localStorage.getItem('user_role') || '';
    }
  }

  navigateToregistration() {
    this.router.navigate(['/login'])
  }

  // navigateToAddNews() {
  //   if (localStorage.getItem('user_role') == "ADMIN" || localStorage.getItem('user_role') == "registered_user") {
  //     this.router.navigate(['/addposts'])
  //   }
  // }
  navigateToAddNews() {

    if (localStorage.getItem('user_role') === "ADMIN") {
      this.router.navigate(['/addposts']);
    } else if(localStorage.getItem('user_role') === "registered_user"){
      this.router.navigate(['/useraddnews']);

    }else {
      alert("You don't have permission to add news. Please log in.");
      this.router.navigate(['/login']);
    }
  }
  

  navigateToDashboard() {
    if (localStorage.getItem('user_role') == "ADMIN") {
      this.router.navigate(['/admindashboard'])
    }else if(localStorage.getItem('user_role') == "registered_user"){
      alert("You are not an admin")
      
    }else{
      this.router.navigate(['/'])
    }
  }

  logout() {
    // Clear user data and navigate to login page
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
