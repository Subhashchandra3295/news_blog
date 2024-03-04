import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../authentication/auth.service';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule, HeaderComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  fetchPostBaseUrl: any = "http://localhost/getpost.php";
  addCommentsBaseUrl: any = "http://localhost/addcomments.php";
  getCommentsBaseUrl: any = "http://localhost/getallcomments.php";
  postData: any;
  showRegistrationMenu: boolean = false;
  token: any;
  comments: any;
  fetchComments: any;
  addcomments: string[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {

  }

  // ngOnInit(): void {
  //   this.http.get<any>(this.fetchPostBaseUrl).subscribe((response: any) => {
  //     if (response.status == true) {
  //       this.postData = response.articles;
  //       console.log(this.postData)
  //     }
  //   });
  //   if (this.token != "" && this.authService.isLoggedIn()) {
  //     this.showRegistrationMenu = true;
  //   } else {
  //     this.showRegistrationMenu = false;
  //   }
  // }

  // readMore(user_id: any, news_id: any) {
  //   this.http.post<any>(this.addCommentsBaseUrl, { 'comments': this.addcomments, 'user_ID': user_id, 'news_id': news_id }).subscribe((response: any) => {
  //     if (response.status == true) {
  //       alert("Comments uploaded");
  //       this.addcomments.length = 0;
  //       this.ngOnInit();
  //     }
  //   })
  // }

  // getAllComments(news_id: any) {
  //   this.http.get<any>(this.getCommentsBaseUrl + "?news_id=" + news_id).subscribe((response: any) => {
  //     if (response.status == true) {
  //       this.fetchComments = response.comments;
  //       console.log(this.fetchComments)
  //     }
  //   })
  // }
  



  ngOnInit(): void {
    this.http.get<any>(this.fetchPostBaseUrl).subscribe((response: any) => {
      if (response.status == true) {
        // Filter out articles with flag = 0
        //this.postData = response.articles.filter(article => article.flag !== 0);
        this.postData = response.articles.filter((article: any) => article.flag !== 0);
      }
    });
    if (this.token != "" && this.authService.isLoggedIn()) {
      this.showRegistrationMenu = true;
    } else {
      this.showRegistrationMenu = false;
    }
  }

  readMore(user_id: any, news_id: any) {
    this.http.post<any>(this.addCommentsBaseUrl, { 'comments': this.addcomments, 'user_ID': user_id, 'news_id': news_id }).subscribe((response: any) => {
      if (response.status == true) {
        alert("Comments uploaded");
        this.addcomments.length = 0;
        this.ngOnInit();
      }
    })
  }

  getAllComments(news_id: any) {
    this.http.get<any>(this.getCommentsBaseUrl + "?news_id=" + news_id).subscribe((response: any) => {
      if (response.status == true) {
        this.fetchComments = response.comments;
      }
    })
  }

  getImageUrl(image: string): string {
  
    return 'http://localhost/' + image; // Adjust the path as per your image URL structure
  }
 
}