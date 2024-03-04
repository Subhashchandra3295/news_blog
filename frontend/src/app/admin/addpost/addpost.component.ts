import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-addpost',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, FormsModule, HeaderComponent],
  templateUrl: './addpost.component.html',
  styleUrl: './addpost.component.scss'
})
export class AddpostsComponent implements OnInit{

  addPostBaseUrl: any = "http://localhost/addpost.php";
  fetchPostBaseUrl: any = "http://localhost/getpost.php";
  addPostForm: FormGroup = new FormGroup({});
  token:  any;
  user_ID: any;


  constructor(private http: HttpClient, private fb: FormBuilder, private cookieService: CookieService) {
    this.user_ID = localStorage.getItem('user_id');
  }
  // File uploading with news data
  imageSrc: any = '';
  status: boolean = false

  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactDetails: ['', Validators.required],
      subject: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  
  onFileChange(event: any) {
    this.status = false
    const file = event.target.files[0];
    this.status = event.target.files.length > 0 ? true : false
    if (this.status == true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      }
    }
  }
  addPost() {
    this.http.post<any>(this.addPostBaseUrl, {'image': this.imageSrc, 'newsData': this.addPostForm.value, 'user_ID': this.user_ID}).subscribe((response: any) => {
      if(response.status == true){
        alert(response.msg);
        this.addPostForm.reset();
      }
    })
  }


}
