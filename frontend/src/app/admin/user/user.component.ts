import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterOutlet, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, ReactiveFormsModule, CommonModule, HeaderComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UsersComponent implements OnInit {

  users: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsersData();
  }

  fetchUsersData(): void {
    // Make an HTTP GET request to fetch users data
    this.http.get<any[]>('http://localhost/getUsersData.php').subscribe(
      (data: any[]) => {
        console.log(data);
        this.users = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    // Make an HTTP POST request to delete user data
    this.http.post<any>('http://localhost/deleteuserdata.php', { user_id: userId }).subscribe(
      (response) => {
        // Refresh the users data after deletion
        this.fetchUsersData();
      },
      (error) => {
        console.error('Error deleting user data:', error);
      }
    );
  }

  changePermission(userId: number) {
    this.http.post<any>('http://localhost/changeuserpermission.php', { 'user_id': userId }).subscribe((response: any) => {
      if (response.status == true) {
        alert("User permission removed");
        this.ngOnInit();
      }
    },
      (error) => {
        console.error('Error deleting user data:', error);
      });
  }


  givePermission(userId: number) {
    this.http.post<any>('http://localhost/giveuserpermission.php', { 'user_id': userId }).subscribe((response: any) => {
      if (response.status == true) {
        alert("User permission updated");
        this.ngOnInit();

      }
    },
      (error) => {
        console.error('Error deleting user data:', error);
      });
  }

}
