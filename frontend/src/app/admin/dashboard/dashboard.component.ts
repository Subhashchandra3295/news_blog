import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private router: Router) {

  }

  navigateToUsers() {
    this.router.navigate(['/users'])
  }


  navigateToaddposts() {
    this.router.navigate(['/addposts'])
  }

  navigateToarticles() {
    this.router.navigate(['/articles'])
  }

}
