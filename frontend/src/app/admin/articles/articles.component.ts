import { HeaderComponent } from '../../header/header.component';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-articles',
  standalone: true,
  imports: [HeaderComponent, HttpClientModule, CommonModule],
  templateUrl: './articles.component.html',
  styleUrl: './articles.component.scss'
})
export class ArticlesComponent implements OnInit {

  articles: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchArticlesData();
  }

  fetchArticlesData(): void {
    // Make an HTTP GET request to fetch articles data
    this.http.get<any[]>('http://localhost/getArticles.php').subscribe(
      (data: any[]) => {
        console.log(data);
        this.articles = data;
      },
      (error) => {
        console.error('Error fetching articles data:', error);
      }
    );
  }

  activateArticle(article: any): void {
    // Implement logic to activate the article
    article.flag = 1;

    // Make an HTTP POST request to update the flag in the database
    this.updateArticleFlag(article);
  }

  deactivateArticle(article: any): void {
    // Implement logic to deactivate the article
    article.flag = 0;

    // Make an HTTP POST request to update the flag in the database
    this.updateArticleFlag(article);
  }

  updateArticleFlag(article: any): void {
    this.http.post<any>('http://localhost/updateArticleFlag.php', { articleId: article.Id, flag: article.flag }).subscribe(
      (response) => {
        console.log('Flag updated successfully:', response);
      },
      (error) => {
        console.error('Error updating article flag:', error);
      }
    );
  }

  // articles: any[] = [];

  // constructor(private http: HttpClient) {}

  // ngOnInit(): void {
  //   this.fetchArticlesData();
  // }

  // fetchArticlesData(): void {
  //   // Make an HTTP GET request to fetch articles data
  //   this.http.get<any[]>('http://localhost/getArticles.php').subscribe(
  //     (data: any[]) => {
  //       this.articles = data;
  //       // Update the button state based on flag value
  //       this.articles.forEach(article => {
  //         if (article.flag === 0) {
  //           article.activateDisabled = false;
  //           article.deactivateDisabled = true;
  //         } else {
  //           article.activateDisabled = true;
  //           article.deactivateDisabled = false;
  //         }
  //       });
  //     },
  //     (error) => {
  //       console.error('Error fetching articles data:', error);
  //     }
  //   );
  // }

  // activateArticle(article: any): void {
  //   // Implement logic to activate the article
  //   article.flag = 1;
  //   article.activateDisabled = true;
  //   article.deactivateDisabled = false;
  //   // Make an HTTP POST request to update the flag in the database
  //   this.updateArticleFlag(article);
  // }

  // deactivateArticle(article: any): void {
  //   // Implement logic to deactivate the article
  //   article.flag = 0;
  //   article.activateDisabled = false;
  //   article.deactivateDisabled = true;
  //   // Make an HTTP POST request to update the flag in the database
  //   this.updateArticleFlag(article);
  // }

  // updateArticleFlag(article: any): void {
  //   this.http.post<any>('http://localhost/updateArticleFlag.php', { articleId: article.Id, flag: article.flag }).subscribe(
  //     (response) => {
  //       console.log('Flag updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating article flag:', error);
  //     }
  //   );
  // }
}
