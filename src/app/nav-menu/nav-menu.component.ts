import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css'],
  providers: [AuthService]
})
export class NavMenuComponent implements OnInit {

  private isOnlineValue = false;
  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login();
    this.isOnlineValue = true;
  }

  logout(): void {
    this.authService.logout();
    this.isOnlineValue = false;
  }

  isOnline(): boolean {
    return this.isOnlineValue;
  }

}
