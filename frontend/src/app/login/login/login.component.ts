import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  userForm: FormGroup;
  registrationForm: FormGroup;
  baseUrl: any = "http://localhost/login.php";
  registrationBaseUrl: any = "http://localhost/registration.php";
  toggleFormView: boolean = false;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder, 
    private cookieService: CookieService,
    private router: Router) { 

    this.userForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', [Validators.required]]
    });

    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      useremail: ['', Validators.required],
      userpassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    
  }

  toggleForm(){
    this.toggleFormView = true;
  }

  sendData() {
    if (this.userForm.valid) {
      this.http.post<any>(this.baseUrl, this.userForm.value).subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        localStorage.setItem('user_name', response.user_name);
        localStorage.setItem('user_role', response.role);
        this.cookieService.set('token', response.token);
        this.router.navigate(['/']);
      });
    } else {
      // Handle form errors
    }
  }

  sendRegistrationData() {
    if (this.registrationForm.valid) {
      this.http.post<any>(this.registrationBaseUrl, this.registrationForm.value).subscribe((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_id', response.user_id);
        this.cookieService.set('token', response.token);
        localStorage.setItem('user_name', response.user_name);
        localStorage.setItem('user_role', response.role);

        if (response.token == "") {
          alert("Please try to register again")
        } else {
          alert("Redirected to Home page")
          this.router.navigate(['/']);
        }
      });
    } else {
      // Handle form errors
    }
  }

}