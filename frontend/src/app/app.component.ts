import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { authGuard } from './authentication/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService]
})
export class AppComponent {
  title = 'newsblogfrontend';
}
