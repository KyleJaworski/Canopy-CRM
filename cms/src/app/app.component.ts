import { Component, OnInit } from '@angular/core';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  imports: [MainLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.setMockUserAsActive();
  }
  title = 'cms';
}
